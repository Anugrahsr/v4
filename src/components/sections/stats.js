import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledStatsSection = styled.section`
  padding: 50px 0;
  max-width: 100%;
  background-color: var(--navy);
  color: var(--slate);

  .stats-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .stat-item {
    flex: 1;
    min-width: 200px;
    text-align: center;
    margin: 20px;
    
    @media (max-width: 768px) {
      margin: 10px 0;
    }
  }

  .stat-number {
    font-size: 48px;
    font-weight: 600;
    color: var(--green);
    margin-bottom: 10px;
    font-family: var(--font-mono);
  }

  .stat-description {
    font-size: var(--fz-md);
    color: var(--slate);
  }
  
  .services-title {
    text-align: left;
    margin: 80px 0 40px;
    padding: 0 20px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    font-size: var(--fz-heading);
    color: var(--lightest-slate);
    position: relative;
    
    &:before {
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: var(--fz-xl);
      color: var(--green);
    }
  }
  
  .services-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 20px;
    margin-bottom: 50px;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  
  .service-card {
    flex: 1;
    min-width: 250px;
    background-color: var(--light-navy);
    border-radius: 4px;
    padding: 25px;
    transition: var(--transition);
    border: 1px solid transparent;
    
    &:hover {
      transform: translateY(-5px);
      border-color: var(--green-tint);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
    }
    
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
  
  .service-title {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    
    span {
      margin-right: 10px;
      font-size: 24px;
    }
  }
  
  .service-description {
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }
  
  .read-more {
    display: inline-block;
    margin-top: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 10px 20px;
    border: 1px solid var(--green);
    border-radius: 4px;
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      background-color: var(--green-tint);
    }
  }
`;

const Stats = () => {
  const data = useStaticQuery(graphql`
    query {
      stats: markdownRemark(fileAbsolutePath: { regex: "/stats/" }) {
        html
        frontmatter {
          title
        }
      }
      services: markdownRemark(fileAbsolutePath: { regex: "/services/" }) {
        html
        frontmatter {
          title
        }
      }
    }
  `);

  // Parse stats from markdown content
  const parseStatsFromHtml = html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h2');
    const stats = [];
    
    headings.forEach(heading => {
      const nextElement = heading.nextElementSibling;
      if (nextElement && nextElement.textContent.trim()) {
        stats.push({
          number: nextElement.textContent.trim(),
          description: heading.textContent.trim(),
        });
      }
    });
    
    return stats;
  };

  // Parse services from markdown content
  const parseServicesFromHtml = html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h2');
    const services = [];
    
    headings.forEach(heading => {
      const nextElement = heading.nextElementSibling;
      if (nextElement && nextElement.textContent.trim()) {
        services.push({
          title: heading.textContent.trim(),
          description: nextElement.textContent.trim(),
        });
      }
    });
    
    return services;
  };

  const stats = data.stats ? parseStatsFromHtml(data.stats.html) : [];
  const services = data.services ? parseServicesFromHtml(data.services.html) : [];

  return (
    <StyledStatsSection id="stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        ))}
      </div>
      
      <h2 className="services-title">{data.services?.frontmatter?.title || 'What I do'}</h2>
      <div className="services-container">
        {services.map((service, index) => {
          // Extract emoji and title from the service title
          const titleParts = service.title.match(/^([\u{1F300}-\u{1F9FF}]*)\s*(.*)$/u);
          const emoji = titleParts ? titleParts[1] : '';
          const titleText = titleParts ? titleParts[2] : service.title;
          
          return (
            <div className="service-card" key={index}>
              <h3 className="service-title">
                {emoji && <span>{emoji}</span>}
                {titleText}
              </h3>
              <p className="service-description">{service.description}</p>
              <a href="#" className="read-more">READ MORE</a>
            </div>
          );
        })}
      </div>
    </StyledStatsSection>
  );
};

export default Stats;