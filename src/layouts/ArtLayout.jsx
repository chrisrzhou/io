import { graphql } from 'gatsby';
import PT from 'prop-types';
import React from 'react';
import Image from 'gatsby-image';

import PageLayout from './PageLayout';
import { getGithubSourceLink } from 'routes';

export default function ArtLayout({ data, pageContext }) {
  const { fields, fluid } = data.imageSharp;

  return (
    <PageLayout
      description={fields.exif.date}
      source={getGithubSourceLink(pageContext.fileAbsolutePath)}
      title={fluid.originalName}
    >
      <Image fluid={fluid} />
    </PageLayout>
  );
}

ArtLayout.propTypes = {
  data: PT.shape({
    imageSharp: PT.object.isRequired,
  }).isRequired,
  pageContext: PT.object.isRequired,
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
