import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const BlogsPage = () => {
  useEffect(() => {
    // Redirect to the pensieve page which contains the blog functionality
    navigate('/pensieve');
  }, []);

  return null;
};

export default BlogsPage;