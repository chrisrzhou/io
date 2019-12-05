import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import GalleryLayout from 'layouts/GalleryLayout';

export default function ArtPage({ data }) {
  const thumbnails = data.allImageSharp.edges.map(({ node }) => {
    const { fields, fluid, id } = node;
    const { src } = fluid;
    return {
      id,
      previewImageSrc: src,
      slug: fields.slug,
      tags: [],
      title: fluid.originalName,
    };
  });
  return <GalleryLayout thumbnails={thumbnails} title="Art" />;
}

ArtPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allArt {
    allImageSharp(sort: { order: DESC, fields: [fields___exif___date] }) {
      edges {
        node {
          id
          ... on ImageSharp {
            fields {
              exif {
                date(formatString: "YYYY-MM-DD")
              }
              slug
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
