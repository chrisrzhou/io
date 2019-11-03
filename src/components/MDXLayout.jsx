import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import { FlexList, Tag } from './ui';
import Layout from './Layout';
import TableOfContents from './tableOfContents';

export default function MDXLayout({ data: { mdx } }) {
  const { body, excerpt, frontmatter, timeToRead, tableOfContents } = mdx;
  const { date, tags, title } = frontmatter;

  return (
    <Layout description={excerpt} title={title}>
      <TableOfContents contents={tableOfContents} />
      <FlexList color="gray3" flexWrap="wrap" fontSize="small" pb={3}>
        <div>{date}</div>
        <div>{timeToRead}min</div>
        {tags && tags.map(tag => <Tag key={tag} to={tag} value={tag} />)}
      </FlexList>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
}

MDXLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query MDXQuery($id: String) {
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
