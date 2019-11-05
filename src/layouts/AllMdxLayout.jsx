import { globalHistory, navigate } from '@reach/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Tags from 'components/Tags';
import Layout from './Layout';
import { TAG_SEARCH_PARAM } from 'enums';
import { Box, FlexList, InfoText, QuoteText, Tag } from 'ui';
import { pluralize } from 'utils';

function getTags(data, pathname) {
  const { edges } = data.allMdx;
  const tagsMap = edges.reduce((tagsCount, { node }) => {
    const tags = node.frontmatter.tags || [];
    tags.forEach(tag => {
      if (!tagsCount[tag]) {
        tagsCount[tag] = 0;
      }
      tagsCount[tag] += 1;
    });
    return tagsCount;
  }, {});

  return Object.keys(tagsMap).map(tag => ({
    count: tagsMap[tag],
    pathname,
    value: tag,
  }));
}

export default function AllMdxLayout({ data, description, title }) {
  const { edges } = data.allMdx;

  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  const entries = edges
    .map(({ node }) => {
      const { excerpt, fields, frontmatter, id, timeToRead } = node;
      const { date, tags, title } = frontmatter;
      return {
        date,
        id,
        excerpt,
        fields,
        tags: tags || [],
        timeToRead,
        title,
      };
    })
    .filter(entry => {
      return !appliedTagValue || entry.tags.includes(appliedTagValue);
    });

  const entriesCount = entries.length;
  const infoText = (
    <InfoText>
      {entriesCount} {pluralize('entry', entriesCount)} found
      {appliedTagValue && (
        <>
          {' '}
          for <Tag pathname={pathname} value={appliedTagValue} /> (
          <a onClick={() => navigate(pathname)}>remove tag</a>)
        </>
      )}
    </InfoText>
  );

  return (
    <Layout
      description={description}
      headerExtraContent={<Tags tags={getTags(data, pathname)} />}
      title={title}
    >
      {infoText}
      <FlexList flexDirection="column" spacing={5} pt={4}>
        {entries.map(entry => {
          const { date, excerpt, fields, id, timeToRead, tags, title } = entry;
          return (
            <FlexList key={id} flexDirection="column" spacing={1}>
              <Link to={fields.slug}>
                <Box as="h2">{title}</Box>
              </Link>
              <FlexList flexWrap="wrap" fontSize="small" pb={3}>
                <InfoText>{date}</InfoText>
                <InfoText>{timeToRead}min</InfoText>
                {tags.map(tag => (
                  <Tag key={tag} pathname={pathname} value={tag} />
                ))}
              </FlexList>
              <QuoteText>{excerpt}</QuoteText>
            </FlexList>
          );
        })}
      </FlexList>
    </Layout>
  );
}

AllMdxLayout.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              date: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string.isRequired),
              title: PropTypes.string,
            }),
            timeToRead: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
