import { format } from 'd3';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import * as routes from 'routes';
import { FlexList, Icon, Iframe, InfoText, Tag } from 'ui';

export default function ProjectLayout({ data, pageContext }) {
  const repo = data.githubData.data.repos.edges.find(({ node }) => {
    return node.id === pageContext.id;
  }).node;

  const {
    description: info,
    homepageUrl,
    name,
    repositoryTopics,
    stargazers,
    url,
  } = repo;

  const tags = repositoryTopics.edges.map(({ node }) => node.topic.name);

  const description = (
    <FlexList flexDirection="column" spacing={1}>
      <InfoText>{info}</InfoText>
      <FlexList justifyContent="space-between">
        <FlexList flexWrap="wrap">
          <FlexList as="a" fontSize="xs" href={url} spacing={0}>
            <Icon icon="github" size="s" title="github" />
            {format(',')(stargazers.totalCount)}
          </FlexList>
          <Icon
            as="a"
            icon="link"
            href={homepageUrl}
            size="s"
            title="homepage"
          />
          {(tags || []).map(tag => (
            <Tag key={tag} pathname={routes.PROJECTS} value={tag} />
          ))}
        </FlexList>
      </FlexList>
    </FlexList>
  );

  return (
    <PageLayout
      description={description}
      source={routes.getGithubLink(name)}
      title={name}
    >
      <Iframe src={homepageUrl} />
    </PageLayout>
  );
}

ProjectLayout.propTypes = {
  data: PropTypes.shape({
    githubData: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allRepos {
    githubData {
      data {
        repos {
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
