import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconMicrophone } from '@components/icons';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  h1 {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 50px;

    a {
      color: var(--green);
      flex-shrink: 0;
      margin-left: 10px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;
  position: relative;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledTalk = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .talk__inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .talk__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .talk__top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .talk__links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .talk__title {
    margin: 0 0 10px 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .talk__desc {
    color: var(--light-slate);
    font-size: var(--fz-sm);
  }

  .talk__meta {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: var(--fz-xs);
    color: var(--light-slate);

    .talk__date {
      font-family: var(--font-mono);
    }

    .talk__venue {
      color: var(--green);
    }
  }

  .talk__tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout location={location}>
      <Helmet title={`Tagged "${tag}"`} />

      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/talks">All talks</Link>
        </span>

        <h1>
          <span>#{tag}</span>
          <span className="subtitle">
            <Link to="/talks/tags">
              <IconMicrophone />
              View all tags
            </Link>
          </span>
        </h1>

        <StyledGrid>
          {edges.map(({ node }, i) => {
            const { frontmatter } = node;
            const { external, title, venue, slides, tags, date, slug, description } = frontmatter;

            return (
              <StyledTalk key={i}>
                <div className="talk__inner">
                  <header>
                    <div className="talk__top">
                      <div className="folder">
                        <IconMicrophone />
                      </div>
                      <div className="talk__links">
                        {external && (
                          <a href={external} aria-label="External Link" className="external">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-external-link"
                            >
                              <title>External Link</title>
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15,3 21,3 21,9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                        {slides && (
                          <a href={slides} aria-label="Slides">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-file-text"
                            >
                              <title>Slides</title>
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10,9 9,9 8,9"></polyline>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="talk__title">
                      <Link to={slug}>{title}</Link>
                    </h3>

                    <div className="talk__desc">
                      <p>{description}</p>
                    </div>
                  </header>

                  <div className="talk__meta">
                    <span className="talk__date">
                      {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    {venue && <span className="talk__venue">{venue}</span>}
                  </div>

                  <footer>
                    {tags && (
                      <ul className="talk__tech-list">
                        {tags.map((tag, i) => (
                          <li key={i}>
                            <Link to={`/talks/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </footer>
                </div>
              </StyledTalk>
            );
          })}
        </StyledGrid>
      </StyledTagsContainer>
    </Layout>
  );
};

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }),
  location: PropTypes.object,
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } }, fileAbsolutePath: { regex: "/talks/" } }
    ) {
      totalCount
      edges {
        node {
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
    }
  }
`;