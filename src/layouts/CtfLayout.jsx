import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import TableOfContents from 'components/TableOfContents';
import { useToggle } from 'hooks';
import * as routes from 'routes';
import { FlexList, Modal, Tag } from 'ui';
import { summarizeTags } from 'utils';

export default function CtfLayout({ data }) {
  const [shown, show, hide] = useToggle(false);

  const { body, frontmatter, rawBody, tableOfContents } = data.mdx;
  const { title } = frontmatter;

  const tags = summarizeTags(rawBody.match(/#\S+/g) || []);
  console.log(tags);

  const description = (
    <FlexList flexWrap="wrap">
      {(tags || []).map(tag => (
        <Tag key={tag.value} pathname={routes.POSTS} value={tag.value} />
      ))}
    </FlexList>
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
