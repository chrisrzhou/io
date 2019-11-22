import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import GalleryLayout from 'layouts/GalleryLayout';
import { pluralize } from 'utils';

export default function DrawingsPage({ data }) {
  const entries = data.allImageSharp.edges.map(({ node }) => {
    const { fields, fluid, id } = node;
    return {
      id,
      preview: fluid.src,
      slug: fields.slug,
      subtitle: fields.exif.date,
      title: fluid.originalName,
    };
  });
  return (
    <GalleryLayout
      entries={entries}
      subtitle={`${pluralize('entry', entries.length)} found`}
      title="Drawings"
    />
  );
}

DrawingsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allDrawings {
    allImageSharp(sort: { order: DESC, fields: [fields___exif___date] }) {
      edges {
        node {
          id
          ... on ImageSharp {
            fields {
              slug
              exif {
                date(formatString: "YYYY-MM-DD")
              }
            }
            fluid(maxWidth: 800) {
              originalName
              src
            }
          }
        }
      }
    }
  }
`;
