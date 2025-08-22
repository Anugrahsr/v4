import React, { useState, useCallback } from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout, SearchBox } from '@components';
import { IconMicrophone } from '@components/icons';
import { searchTalks } from '@utils/search';

const StyledMainContainer = styled.main`
  & > header {
    margin-bottom: 100px;
    text-align: center;

    a {
      &:hover,
      &:focus {
        cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🎤</text></svg>")
            20 0,
          auto;
      }
    }
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;

const StyledGrid = styled.div`
  margin-top: 50px;

  .talks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 20px;
    position: relative;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
`;

const StyledTalk = styled.div`
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus {
    outline: 0;
    .talk-inner {
      transform: translateY(-7px);
    }
  }

  .talk-inner {
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

  .talk-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .talk-links {
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

  .talk-title {
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

  .talk-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .talk-footer {
    ${({ theme }) => theme.mixins.flexBetween};
    align-items: flex-end;
    flex-grow: 1;
    width: 100%;
    margin-top: auto;
  }

  .talk-tech-list {
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

  .talk-date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }
`;

const StyledTags = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.75;

    &:not(:last-of-type) {
      margin-right: 15px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }
`;



const TalksPage = ({ location, data }) => {
  const allTalks = data.allMarkdownRemark.edges;
  const [filteredTalks, setFilteredTalks] = useState(allTalks);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredTalks(allTalks);
    } else {
      const filtered = searchTalks(allTalks, term);
      setFilteredTalks(filtered);
    }
  }, [allTalks]);

  const handleFilter = useCallback((filtered) => {
    setFilteredTalks(filtered);
  }, []);



  return (
    <Layout location={location}>
      <Helmet title="Talks" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Talks & Conferences</h1>
          <p className="subtitle">
            <a href="#">
              sharing knowledge through speaking
            </a>
          </p>
        </header>

        <SearchBox
          data={allTalks}
          onFilter={handleFilter}
          searchFunction={searchTalks}
          placeholder="Search talks by title, description, or tags..."
          showCount={true}
        />



        <StyledGrid>
          <div className="talks">
            {filteredTalks.length > 0 ? (
              filteredTalks.map(({ node }, i) => {
                const { frontmatter } = node;
                const { title, description, slug, date, tags, external, slides, venue, image } = frontmatter;
                const d = new Date(date);

                return (
                  <StyledTalk key={i}>
                    <div className="talk-inner">
                      <header>
                        <div className="talk-top">
                          <div className="folder">
                            <IconMicrophone />
                          </div>
                          <div className="talk-links">
                            {external && (
                              <a href={external} aria-label="External Link" className="external">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  role="img"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1"
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
                                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        <h3 className="talk-title">
                          <Link to={slug || '#'}>{title}</Link>
                        </h3>

                        <div className="talk-description">{description}</div>
                        
                        {venue && (
                          <div className="talk-venue" style={{ color: 'var(--green)', marginTop: '10px', fontSize: 'var(--fz-sm)' }}>
                            📍 {venue}
                          </div>
                        )}
                      </header>

                      <footer className="talk-footer">
                        <div className="talk-date">
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <StyledTags>
                          {tags &&
                            tags.length > 0 &&
                            tags.map((tag, i) => (
                              <li key={i}>
                                <Link
                                  to={`/talks/tags/${kebabCase(tag)}/`}
                                  className="inline-link"
                                >
                                  #{tag}
                                </Link>
                              </li>
                            ))}
                        </StyledTags>
                      </footer>
                    </div>
                  </StyledTalk>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--slate)',
                  fontSize: 'var(--fz-lg)',
                  gridColumn: '1 / -1',
                  padding: '50px 0',
                }}
              >
                No talks found matching your search.
              </div>
            )}
          </div>
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

TalksPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default TalksPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/talks/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
            external
            slides
            venue
          }
          html
        }
      }
    }
  }
`;