import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import legacyGistsPng from 'images/legacy_gists.png';
import GalleryLayout from 'layouts/GalleryLayout';

export default function ProjectsPage({ data }) {
  const thumbnails = data.githubData.data.repos.edges.map(({ node }) => {
    const { id, name, openGraphImageUrl, repositoryTopics } = node;
    return {
      id,
      previewImageSrc: openGraphImageUrl,
      slug: `/projects/${name}`,
      tags: repositoryTopics.edges.map(({ node }) => node.topic.name),
      title: name,
    };
  });
  thumbnails.push({
    id: 'archived_gists',
    externalUrl: 'https://bl.ocks.org/chrisrzhou',
    previewImageSrc: legacyGistsPng,
    tags: ['legacy', 'd3', 'visualization'],
    title: 'Archived Gists',
  });
  return <GalleryLayout thumbnails={thumbnails} title="Projects" />;
}

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allProjects {
    githubData {
      data {
        repos {
          edges {
            node {
              homepageUrl
              id
              name
              openGraphImageUrl
              repositoryTopics {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
