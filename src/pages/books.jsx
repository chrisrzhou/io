import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import PostListLayout from 'layouts/PostListLayout';

export default function BooksPage({ data }) {
  return (
    <PostListLayout
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
  query allBooks {
    allMdx(
      filter: { fields: { sourceInstanceName: { eq: "books" } } }
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
