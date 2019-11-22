import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from './PageLayout';
import TableOfContents from 'components/TableOfContents';
import { useToggle } from 'hooks';
import { FlexList, Icon, Modal, Tag } from 'ui';

export default function PostLayout({ data, pageContext }) {
  const [shown, show, hide] = useToggle(false);

  const { body, frontmatter, tableOfContents, timeToRead } = data.mdx;
  const { date, tags, title } = frontmatter;

  const subtitle = (
    <FlexList flexWrap="wrap">
      <div>{date}</div>
      <div>{`${timeToRead}min`}</div>
      {(tags || []).map(tag => (
        <Tag
          key={tag}
          pathname={`/${pageContext.sourceInstanceName}`}
          value={tag}
        />
      ))}
    </FlexList>
  );

  return (
    <PageLayout
      action={
        tableOfContents.items && (
          <Icon
            as="a"
            icon="book"
            onClick={show}
            size="l"
            title="Table of contents"
          />
        )
      }
      subtitle={subtitle}
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
