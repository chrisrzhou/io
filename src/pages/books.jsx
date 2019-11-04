import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import AllMdxLayout from 'layouts/AllMdxLayout';

export default function BooksPage({ data }) {
  return (
    <AllMdxLayout
      data={data}
      description="Book reviews and ratings."
      title="Books"
    />
  );
}

BooksPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query AllMdxReadings {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//books/" } }
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
