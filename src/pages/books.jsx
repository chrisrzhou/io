import { graphql } from 'gatsby';
import PT from 'prop-types';
import React from 'react';

import EntriesLayout from 'layouts/EntriesLayout';

export default function BooksPage({ data }) {
  return <EntriesLayout data={data} title="Books" />;
}

BooksPage.propTypes = {
  data: PT.object.isRequired,
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
