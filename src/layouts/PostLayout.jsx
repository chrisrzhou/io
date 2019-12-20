import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import TableOfContents from 'components/TableOfContents';
import { useToggle } from 'hooks';
import * as routes from 'routes';
import { FlexList, Modal, Tag } from 'ui';

export default function PostLayout({ data, pageContext }) {
  const [shown, show, hide] = useToggle(false);

  const { body, frontmatter, tableOfContents, timeToRead } = data.mdx;
  const { date, tags, title } = frontmatter;

  const description = (
    <FlexList flexWrap="wrap">
      <div>{date}</div>
      <div>{`${timeToRead}min`}</div>
      {(tags || []).map(tag => (
        <Tag key={tag} pathname={routes.POSTS} value={tag} />
      ))}
    </FlexList>
  );

  const actions = tableOfContents.items
    ? [{ icon: 'book', onClick: show, title: 'Table of contents' }]
    : undefined;

  return (
    <PageLayout
      actions={actions}
      description={description}
      source={routes.getGithubSourceLink(pageContext.fileAbsolutePath)}
      title={title}
    >
      <MDXRenderer>{body}</MDXRenderer>
      <Modal onDismiss={hide} shown={shown} title="Table of Contents">
        <TableOfContents contents={tableOfContents} onSelectContent={hide} />
      </Modal>
    </PageLayout>
  );
}

PostLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query post($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        tags
        title
      }
      id
      tableOfContents
      timeToRead
    }
  }
`;
