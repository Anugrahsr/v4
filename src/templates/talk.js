import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledTalkContainer = styled.main`
  max-width: 1000px;
`;

const StyledTalkHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;

const StyledTalkContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--light-navy);
    color: var(--white);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const StyledTalkMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;

  .venue {
    color: var(--green);
    font-size: var(--fz-md);
    display: flex;
    align-items: center;
    
    &:before {
      content: '📍';
      margin-right: 8px;
    }
  }

  .talk-links {
    display: flex;
    align-items: center;
    gap: 15px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      display: flex;
      align-items: center;
      gap: 5px;
      
      &.external:before {
        content: '📺';
      }
      
      &.slides:before {
        content: '📊';
      }
    }
  }
`;

const TalkTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags, venue, external, slides } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledTalkContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/talks">All talks</Link>
        </span>

        <StyledTalkHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&nbsp;&mdash;&nbsp;</span>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} to={`/talks/tags/${kebabCase(tag)}/`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
          
          <StyledTalkMeta>
            {venue && (
              <div className="venue">
                {venue}
              </div>
            )}
            
            <div className="talk-links">
              {external && (
                <a href={external} target="_blank" rel="noopener noreferrer" className="external">
                  Watch Recording
                </a>
              )}
              {slides && (
                <a href={slides} target="_blank" rel="noopener noreferrer" className="slides">
                  View Slides
                </a>
              )}
            </div>
          </StyledTalkMeta>
        </StyledTalkHeader>

        <StyledTalkContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledTalkContainer>
    </Layout>
  );
};

TalkTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default TalkTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
        venue
        external
        slides
      }
    }
  }
`;