import { globalHistory } from '@reach/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import WithTagsLayout from './WithTagsLayout';
import { Box, Flex, FlexList, InfoText, Tag } from 'ui';

export default function EntriesLayout({ data, title }) {
  const { edges } = data.allMdx;
  const { pathname } = globalHistory.location;

  const entries = edges.map(({ node }) => {
    const { excerpt, fields, frontmatter, id, timeToRead } = node;
    const { date, isbn, title } = frontmatter;
    let tags = frontmatter.tags || [];
    if (isbn) {
      tags = ['reading', ...tags];
    }
    return {
      date,
      id,
      excerpt,
      fields,
      tags,
      timeToRead,
      title,
    };
  });

  function renderEntry(entry) {
    const { date, excerpt, fields, id, tags, timeToRead, title } = entry;
    return (
      <Flex flexDirection="column" key={id}>
        <Link to={fields.slug}>
          <h2>{title}</h2>
        </Link>
        <FlexList flexWrap="wrap" pb={2}>
          {date && <InfoText>{date}</InfoText>}
          {timeToRead && <InfoText>{`${timeToRead}min`}</InfoText>}
          {tags.map(tag => (
            <Tag key={tag} pathname={pathname} value={tag} />
          ))}
        </FlexList>
        {excerpt && <Box fontFamily="serif">{excerpt}</Box>}
      </Flex>
    );
  }

  return (
    <WithTagsLayout entries={entries} renderEntry={renderEntry} title={title} />
  );
}

EntriesLayout.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.object.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
