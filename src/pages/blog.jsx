import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import AllMdxLayout from 'layouts/AllMdxLayout';

export default function BlogPage({ data }) {
  return (
    <AllMdxLayout
      data={data}
      description="Writings about technology, philosophy and other random things."
      title="Blog"
    />
  );
}

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query AllMdxBlog {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//blog/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            tags
            title
          }
          timeToRead
        }
      }
    }
  }
`;
