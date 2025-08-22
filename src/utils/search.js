/**
 * Search utility functions for filtering blog posts and projects
 */

/**
 * Normalize text for searching (lowercase, trim)
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
const normalizeText = (text) => {
  if (!text) return '';
  return text.toLowerCase().trim();
};

/**
 * Search through talks
 * @param {Array} talks - Array of talk objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered talks
 */
export const searchTalks = (talks, searchTerm) => {
  if (!searchTerm || !talks) return talks;
  
  const normalizedSearch = normalizeText(searchTerm);
  
  return talks.filter(({ node }) => {
    const { frontmatter, html } = node;
    
    // Search in title
    if (normalizeText(frontmatter?.title).includes(normalizedSearch)) return true;
    
    // Search in description
    if (normalizeText(frontmatter?.description).includes(normalizedSearch)) return true;
    
    // Search in venue
    if (normalizeText(frontmatter?.venue).includes(normalizedSearch)) return true;
    
    // Search in tags
    if (arrayContains(frontmatter?.tags, normalizedSearch)) return true;
    
    // Search in content (HTML)
    if (normalizeText(html).includes(normalizedSearch)) return true;
    
    return false;
  });
};

/**
 * Check if an array contains a search term
 * @param {Array} array - Array to search in
 * @param {string} searchTerm - Term to search for
 * @returns {boolean} - Whether the term was found
 */
const arrayContains = (array, searchTerm) => {
  if (!array || !Array.isArray(array)) return false;
  return array.some(item => normalizeText(item).includes(normalizeText(searchTerm)));
};

/**
 * Search through blog posts
 * @param {Array} posts - Array of blog post objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered posts
 */
export const searchBlogPosts = (posts, searchTerm) => {
  if (!searchTerm || !posts) return posts;
  
  const normalizedSearch = normalizeText(searchTerm);
  
  return posts.filter(({ node }) => {
    const { frontmatter, html } = node;
    
    // Search in title
    if (normalizeText(frontmatter?.title).includes(normalizedSearch)) return true;
    
    // Search in description
    if (normalizeText(frontmatter?.description).includes(normalizedSearch)) return true;
    
    // Search in tags
    if (arrayContains(frontmatter?.tags, normalizedSearch)) return true;
    
    // Search in content (HTML)
    if (normalizeText(html).includes(normalizedSearch)) return true;
    
    return false;
  });
};

/**
 * Search through projects
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered projects
 */
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm || !projects) return projects;
  
  const normalizedSearch = normalizeText(searchTerm);
  
  return projects.filter(({ node }) => {
    const { frontmatter, html } = node;
    
    // Search in title
    if (normalizeText(frontmatter?.title).includes(normalizedSearch)) return true;
    
    // Search in company
    if (normalizeText(frontmatter?.company).includes(normalizedSearch)) return true;
    
    // Search in tech stack
    if (arrayContains(frontmatter?.tech, normalizedSearch)) return true;
    
    // Search in content (HTML)
    if (normalizeText(html).includes(normalizedSearch)) return true;
    
    return false;
  });
};

/**
 * Generic search function that can handle different content types
 * @param {Array} items - Array of items to search
 * @param {string} searchTerm - Search term
 * @param {Object} options - Search options
 * @returns {Array} - Filtered items
 */
export const searchContent = (items, searchTerm, options = {}) => {
  if (!searchTerm || !items) return items;
  
  const {
    searchFields = ['title', 'description', 'tags', 'tech', 'company'],
    searchInContent = true,
    caseSensitive = false
  } = options;
  
  const normalizedSearch = caseSensitive ? searchTerm : normalizeText(searchTerm);
  
  return items.filter(item => {
    // Handle both direct objects and GraphQL node structure
    const data = item.node || item;
    const { frontmatter, html } = data;
    
    // Search in specified fields
    for (const field of searchFields) {
      const fieldValue = frontmatter?.[field];
      
      if (Array.isArray(fieldValue)) {
        // Handle arrays (tags, tech, etc.)
        if (arrayContains(fieldValue, searchTerm)) return true;
      } else if (fieldValue) {
        // Handle strings
        const normalizedField = caseSensitive ? fieldValue : normalizeText(fieldValue);
        if (normalizedField.includes(normalizedSearch)) return true;
      }
    }
    
    // Search in content if enabled
    if (searchInContent && html) {
      const normalizedContent = caseSensitive ? html : normalizeText(html);
      if (normalizedContent.includes(normalizedSearch)) return true;
    }
    
    return false;
  });
};

/**
 * Highlight search terms in text
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Term to highlight
 * @returns {string} - Text with highlighted terms
 */
export const highlightSearchTerm = (text, searchTerm) => {
  if (!text || !searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Get search suggestions based on available content
 * @param {Array} items - Array of items to analyze
 * @returns {Array} - Array of suggested search terms
 */
export const getSearchSuggestions = (items) => {
  const suggestions = new Set();
  
  items.forEach(item => {
    const data = item.node || item;
    const { frontmatter } = data;
    
    // Add tags
    if (frontmatter?.tags) {
      frontmatter.tags.forEach(tag => suggestions.add(tag));
    }
    
    // Add tech stack
    if (frontmatter?.tech) {
      frontmatter.tech.forEach(tech => suggestions.add(tech));
    }
    
    // Add company names
    if (frontmatter?.company) {
      suggestions.add(frontmatter.company);
    }
  });
  
  return Array.from(suggestions).sort();
};