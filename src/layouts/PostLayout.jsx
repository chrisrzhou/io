import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from './Layout';
import TableOfContents from 'components/TableOfContents';
import { FlexList, Tag } from 'ui';

export default function PostLayout({ data, pageContext }) {
  const { body, excerpt, frontmatter, tableOfContents, timeToRead } = data.mdx;
  const { date, tags, title } = frontmatter;

  const subtitle = (
    <FlexList flexWrap="wrap">
      <div>{date}</div>
      <div>{timeToRead}min</div>
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
    <Layout
      description={excerpt}
      headerExtraContent={<TableOfContents contents={tableOfContents} />}
      subtitle={subtitle}
      title={title}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
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
      id
      body
      excerpt
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        tags
      }
      timeToRead
      tableOfContents
    }
  }
`;
