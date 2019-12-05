import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Image from 'gatsby-image';

import PageLayout from './PageLayout';

export default function ArtLayout({ data }) {
  const { fields, fluid } = data.imageSharp;

  return (
    <PageLayout description={fields.exif.date} title={fluid.originalName}>
      <Image fluid={fluid} />
    </PageLayout>
  );
}

ArtLayout.propTypes = {
  data: PropTypes.shape({
    imageSharp: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query art($id: String) {
    imageSharp(id: { eq: $id }) {
      id
      fluid {
        aspectRatio
        src
        srcSet
        sizes
        originalName
      }
      fields {
        exif {
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
