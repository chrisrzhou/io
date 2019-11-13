import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import PostListLayout from 'layouts/PostListLayout';

export default function PostsPage({ data }) {
  return (
    <PostListLayout
      data={data}
      description="Writings about technology, philosophy and other random things."
      title="Posts"
    />
  );
}

PostsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allPosts {
    allMdx(
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
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
