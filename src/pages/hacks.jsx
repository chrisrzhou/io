import * as d3 from 'd3';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import GalleryLayout from 'layouts/GalleryLayout';
import * as routes from 'routes';
import { Box, FlexList, Icon, InfoText, Tag } from 'ui';
import { pluralize } from 'utils';

function PreviewRender({ src }) {
  return (
    <Box
      css={`
        position: relative;
        ::after {
          content: 'Loading hack...';
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          position: absolute;
        }
      `}
      height="100%"
      overflow="hidden"
      width="100%"
    >
      <Box
        as="iframe"
        css={`
          border: 0;
          height: 200%;
          transform: scale(0.5);
          transform-origin: 0 0;
          width: 200%;
          z-index: var(--z-index-base);
        `}
        src={src}
      />
    </Box>
  );
}

PreviewRender.propTypes = {
  isPreview: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

export default function HacksPage({ data, location }) {
  const thumbnails = data.githubData.data.search.edges.map(({ node }) => {
    const {
      description,
      homepageUrl,
      id,
      name: title,
      repositoryTopics,
      stargazers,
      url,
    } = node;
    const tags = repositoryTopics.edges.map(({ node }) => node.topic.name);

    const subtitle = (
      <FlexList flexDirection="column" spacing={1}>
        <InfoText>{description}</InfoText>
        <FlexList justifyContent="space-between">
          <FlexList flexWrap="wrap">
            <FlexList as="a" fontSize="xs" href={url} spacing={0}>
              <Icon icon="github" size="s" title="github" />
              {d3.format(',')(stargazers.totalCount)}
            </FlexList>
            <Icon
              as="a"
              icon="link"
              href={homepageUrl}
              size="s"
              title="homepage"
            />
            {(tags || []).map(tag => (
              <Tag key={tag} pathname={routes.HACKS} value={tag} />
            ))}
          </FlexList>
        </FlexList>
      </FlexList>
    );

    return {
      id,
      preview: <PreviewRender isPreview src={homepageUrl} />,
      render: <PreviewRender src={homepageUrl} />,
      subtitle,
      title,
    };
  });
  return (
    <GalleryLayout
      location={location}
      subtitle={`${pluralize('hack', thumbnails.length)} found`}
      thumbnails={thumbnails}
      title="Hacks"
    />
  );
}

HacksPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allHacks {
    githubData {
      data {
        search {
          edges {
            node {
              description
              homepageUrl
              id
              name
              repositoryTopics {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
              stargazers {
                totalCount
              }
              url
            }
          }
        }
      }
    }
  }
`;
