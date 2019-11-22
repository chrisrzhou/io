import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Image from 'gatsby-image';

import PageLayout from './PageLayout';

export default function DrawingLayout({ data }) {
  const { fields, fluid } = data.imageSharp;

  return (
    <PageLayout subtitle={fields.exif.date} title={fluid.originalName}>
      <Image fluid={fluid} />
    </PageLayout>
  );
}

DrawingLayout.propTypes = {
  data: PropTypes.shape({
    imageSharp: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query drawing($id: String) {
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
