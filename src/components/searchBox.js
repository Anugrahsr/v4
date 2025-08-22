import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const StyledSearchContainer = styled.div`
  margin-bottom: 50px;
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  font-size: var(--fz-lg);
  background-color: var(--light-navy);
  border: 1px solid var(--light-slate);
  border-radius: var(--border-radius);
  color: var(--lightest-slate);
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--green);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }

  &::placeholder {
    color: var(--slate);
  }
`;

const StyledSearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--slate);
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledResultsCount = styled.div`
  margin-top: 10px;
  text-align: center;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
`;

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SearchBox = ({ data, onFilter, searchFunction, placeholder = "Search posts...", showCount = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      onFilter(data);
      return;
    }

    const filtered = searchFunction ? searchFunction(data, searchTerm) : data;
    setFilteredData(filtered);
    onFilter(filtered);
  }, [searchTerm, data, onFilter, searchFunction]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <StyledSearchContainer>
      <div style={{ position: 'relative' }}>
        <StyledSearchInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <StyledSearchIcon>
          <SearchIcon />
        </StyledSearchIcon>
      </div>
      {showCount && (
        <StyledResultsCount>
          {searchTerm ? `${filteredData.length} result${filteredData.length !== 1 ? 's' : ''} found` : `${data.length} total items`}
        </StyledResultsCount>
      )}
    </StyledSearchContainer>
  );
};

export default SearchBox;