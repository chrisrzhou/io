import { graphql } from 'gatsby';
import PT from 'prop-types';
import React from 'react';

import EntriesLayout from 'layouts/EntriesLayout';

export default function PostsPage({ data }) {
  return <EntriesLayout data={data} title="Posts" />;
}

PostsPage.propTypes = {
  data: PT.object.isRequired,
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
