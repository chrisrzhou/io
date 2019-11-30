import { globalHistory, navigate } from '@reach/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Tags from 'components/Tags';
import PageLayout from './PageLayout';
import { TAG_SEARCH_PARAM } from 'enums';
import { useToggle } from 'hooks';
import { Box, FlexList, Modal, Tag } from 'ui';
import { pluralize } from 'utils';

function getTags(entries, pathname) {
  const tagsMap = entries.reduce((tagsCount, entry) => {
    entry.tags.forEach(tag => {
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

export default function PostListLayout({ data, title }) {
  const [shown, show, hide] = useToggle(false);

  const { edges } = data.allMdx;
  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  const entries = edges
    .map(({ node }) => {
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
    })
    .filter(entry => {
      return !appliedTagValue || entry.tags.includes(appliedTagValue);
    });

  const subtitle = (
    <>
      {pluralize('entry', entries.length)} found
      {appliedTagValue && (
        <>
          {' '}
          for <Tag pathname={pathname} value={appliedTagValue} /> (
          <a onClick={() => navigate(pathname)}>clear</a>)
        </>
      )}
    </>
  );

  const actions = [{ icon: 'hash', onClick: show, title: 'Tags' }];

  return (
    <PageLayout actions={actions} subtitle={subtitle} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {entries.map(entry => {
          const { date, excerpt, fields, id, tags, timeToRead, title } = entry;
          return (
            <FlexList key={id} flexDirection="column" spacing={0}>
              <Link to={fields.slug}>
                <h2>{title}</h2>
              </Link>
              <FlexList color="gray3" flexWrap="wrap" fontSize="s" pb={2}>
                <div>{date}</div>
                <div>{`${timeToRead}min`}</div>
                {tags.map(tag => (
                  <Tag key={tag} pathname={pathname} value={tag} />
                ))}
              </FlexList>
              <Box color="gray2" fontFamily="serif">
                {excerpt}
              </Box>
            </FlexList>
          );
        })}
      </FlexList>
      <Modal onDismiss={hide} shown={shown} title="Tags">
        <Tags onSelectTag={hide} tags={getTags(entries, pathname)} />
      </Modal>
    </PageLayout>
  );
}

PostListLayout.propTypes = {
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
              isbn: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string.isRequired),
              title: PropTypes.string,
            }),
            timeToRead: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
