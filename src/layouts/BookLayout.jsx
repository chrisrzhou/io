import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import TableOfContents from 'components/TableOfContents';
import { useToggle } from 'hooks';
import * as routes from 'routes';
import { FlexList, Modal, Tag } from 'ui';

export default function BookLayout({ data, pageContext }) {
  const [shown, show, hide] = useToggle(false);

  const { body, frontmatter, tableOfContents, timeToRead } = data.mdx;
  const { author, date, isbn, tags, title } = frontmatter;

  const description = (
    <FlexList flexWrap="wrap">
      <div>by {author}</div>
      <div>{date}</div>
      <div>{`${timeToRead}min`}</div>
      {(tags || []).map(tag => (
        <Tag key={tag} pathname={routes.BOOKS} value={tag} />
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
      <a href={`https://isbnsearch.org/isbn/${isbn}`}>ISBN: {isbn}</a>
      <MDXRenderer>{body}</MDXRenderer>
      <Modal onDismiss={hide} shown={shown} title="Table of Contents">
        <TableOfContents contents={tableOfContents} onSelectContent={hide} />
      </Modal>
    </PageLayout>
  );
}

BookLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query book($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        author
        date(formatString: "YYYY-MM-DD")
        isbn
        tags
        title
      }
      id
      tableOfContents
      timeToRead
    }
  }
`;
