import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import GalleryLayout from 'layouts/GalleryLayout';
import { Box } from 'ui';
import { pluralize } from 'utils';

function PreviewRender({ isPreview = false, src }) {
  return (
    <Box
      as="img"
      css={`
        object-fit: cover;
      `}
      src={src}
      height={isPreview ? '100%' : undefined}
      width="100%"
    />
  );
}

PreviewRender.propTypes = {
  isPreview: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

export default function ArtPage({ data, location }) {
  const thumbnails = data.allImageSharp.edges.map(({ node }) => {
    const { fields, fluid, id } = node;
    const { src } = fluid;

    return {
      id,
      preview: <PreviewRender isPreview src={src} />,
      render: <PreviewRender src={src} />,
      subtitle: fields.exif.date,
      title: fluid.originalName,
    };
  });
  return (
    <GalleryLayout
      location={location}
      subtitle={`${pluralize('entry', thumbnails.length)} found`}
      thumbnails={thumbnails}
      title="Art"
    />
  );
}

ArtPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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
