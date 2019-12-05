import { globalHistory } from '@reach/router';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import WithTagsLayout from './WithTagsLayout';
import { Flex, FlexList, InfoText, Tag, TypeText } from 'ui';

export default function PostListLayout({ data, title }) {
  const [activePostId, setActivePostId] = useState();
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
      <FlexList
        css={`
          position: relative;
        `}
        flexDirection="column"
        key={id}
        onMouseEnter={() => setActivePostId(id)}
        onMouseLeave={() => setActivePostId()}
        spacing={0}
      >
        <Link to={fields.slug}>
          <h2>{title}</h2>
        </Link>
        <FlexList flexWrap="wrap" pb={2}>
          <InfoText>{date}</InfoText>
          <InfoText>{`${timeToRead}min`}</InfoText>
          {tags.map(tag => (
            <Tag key={tag} pathname={pathname} value={tag} />
          ))}
        </FlexList>
        {activePostId === id && (
          <Flex
            alignItems="center"
            as={Link}
            bg="backgroundAlpha"
            color="gray2"
            css={`
              bottom: 0;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
            `}
            fontFamily="serif"
            to={fields.slug}
          >
            <TypeText delay={5} text={excerpt} />
          </Flex>
        )}
      </FlexList>
    );
  }

  return (
    <WithTagsLayout entries={entries} renderEntry={renderEntry} title={title} />
  );
}

PostListLayout.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.object.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
