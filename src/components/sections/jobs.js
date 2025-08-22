import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';

// No need for hardcoded logo mapping - logos are now auto-detected from job folders

const StyledJobsSection = styled.section`
  max-width: 800px;
  
  .numbered-heading {
    margin-bottom: 40px;
  }

  .inner {
    display: flex;
    background: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }

    @media (max-width: 600px) {
      display: block;
      padding: 15px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
  transition: var(--transition);

  .company-logo {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
    transition: var(--transition);
    filter: ${({ isActive }) => (isActive ? 'none' : 'grayscale(100%)')};
  }

  .company-name {
    transition: var(--transition);
  }

  @media (max-width: 768px) {
    padding: 0 15px 2px;
    
    .company-logo {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 140px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
    flex-direction: column;
    
    .company-logo {
      margin-right: 0;
      margin-bottom: 4px;
    }
  }

  &:hover,
  &:focus {
    background-color: var(--navy);
    color: var(--green);
    
    .company-logo {
      opacity: 1;
      filter: none;
      transform: scale(1.1);
    }
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  margin-left: 20px;
  flex: 1;
  min-height: 300px;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  background: var(--navy);
  border-radius: var(--border-radius);
  border: 1px solid var(--lightest-navy);
  position: relative;
  transition: var(--transition);

  &:hover {
    border-color: var(--green);
    box-shadow: 0 10px 30px -15px rgba(100, 255, 218, 0.3);
    
    .panel-logo {
      transform: scale(1.1);
      filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.5));
    }
  }

  .panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .panel-logo {
    width: 60px;
    height: 60px;
    opacity: 0.8;
    transition: all 0.3s ease;
    flex-shrink: 0;
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 600px) {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      padding: 6px;
    }
  }

  .panel-content {
    flex: 1;
    
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 8px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;
    color: var(--lightest-slate);

    .company {
      color: var(--green);
      font-weight: 600;
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 500;
    padding: 4px 8px;
    background: rgba(100, 255, 218, 0.1);
    border-radius: 4px;
    display: inline-block;
  }

  p, li {
    color: var(--slate);
    line-height: 1.6;
  }

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
      logos: allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          relativeDirectory: { regex: "/jobs/" }
          name: { eq: "logo" }
          extension: { in: ["svg", "png"] }
        }
      ) {
        edges {
          node {
            publicURL
            relativeDirectory
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  
  // Create logo mapping from GraphQL data
  const logoMap = {};
  data.logos.edges.forEach(({ node }) => {
    const companyFolder = node.relativeDirectory.split('/').pop();
    logoMap[companyFolder] = node.publicURL;
  });

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              const companyFolder = node.parent.relativeDirectory.split('/').pop();
              const logoSrc = logoMap[companyFolder];
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  {logoSrc && (
                    <img 
                      src={logoSrc} 
                      alt={`${company} logo`} 
                      className="company-logo"
                    />
                  )}
                  <span className="company-name">{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;
              const companyFolder = node.parent.relativeDirectory.split('/').pop();
              const logoSrc = logoMap[companyFolder];

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    
                    <div className="panel-header">
                      <div className="panel-content">
                        <h3>
                          <span>{title}</span>
                          <span className="company">
                            &nbsp;@&nbsp;
                            <a href={url} className="inline-link">
                              {company}
                            </a>
                          </span>
                        </h3>
                        <p className="range">{range}</p>
                      </div>
                      
                      {logoSrc && (
                        <img 
                          src={logoSrc} 
                          alt={`${company} logo`} 
                          className="panel-logo"
                        />
                      )}
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
