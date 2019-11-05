import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from './Layout';
import TableOfContents from 'components/TableOfContents';
import { FlexList, InfoText, Tag } from 'ui';

export default function MdxLayout({ data, pageContext }) {
  const { body, excerpt, frontmatter, tableOfContents, timeToRead } = data.mdx;
  const { date, tags, title } = frontmatter;

  return (
    <Layout
      description={excerpt}
      headerExtraContent={<TableOfContents contents={tableOfContents} />}
      title={title}
    >
      <FlexList flexWrap="wrap" fontSize="small" pb={3}>
        <InfoText>{date}</InfoText>
        <InfoText>{timeToRead}min</InfoText>
        {tags &&
          tags.map(tag => (
            <Tag
              key={tag}
              pathname={`/${pageContext.sourceInstanceName}`}
              value={tag}
            />
          ))}
      </FlexList>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
}

MdxLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
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
