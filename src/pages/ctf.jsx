import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import EntriesLayout from 'layouts/EntriesLayout';

export default function CtfPage({ data }) {
  return <EntriesLayout data={data} title="CTF" />;
}

CtfPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allCtfs {
    allMdx(filter: { fields: { sourceInstanceName: { eq: "ctf" } } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            tags
            title
          }
        }
      }
    }
  }
`;
