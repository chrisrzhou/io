import { globalHistory, navigate } from '@reach/router';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import TagsSummary from 'components/TagsSummary';
import TableOfContents from 'components/TableOfContents';
import { TAG_SEARCH_PARAM } from 'enums';
import { useToggle } from 'hooks';
import { Modal, Tag } from 'ui';
import { summarizeTags, pluralize } from 'utils';

export default function CtfLayout({ data }) {
  const [shown, show, hide] = useToggle(false);

  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  const { body, frontmatter, rawBody, tableOfContents } = data.mdx;
  const { title } = frontmatter;

  const tags = summarizeTags(rawBody.match(/#\S+/g) || []);

  const description = appliedTagValue ? (
    <div>
      {pluralize('entry', 23)} found for{' '}
      <Tag pathname={pathname} value={appliedTagValue} /> (
      <a onClick={() => navigate(pathname)}>clear</a>)
    </div>
  ) : (
    <TagsSummary pathname={pathname} tags={tags} />
  );

  const actions = tableOfContents.items
    ? [{ icon: 'book', onClick: show, title: 'Table of contents' }]
    : undefined;

  return (
    <PageLayout actions={actions} description={description} title={title}>
      <MDXRenderer>{body}</MDXRenderer>
      <Modal onDismiss={hide} shown={shown} title="Table of Contents">
        <TableOfContents contents={tableOfContents} onSelectContent={hide} />
      </Modal>
    </PageLayout>
  );
}

CtfLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ctf($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
      rawBody
      tableOfContents
    }
  }
`;
