import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Layout from './Layout';
import { Box, FlexList, Tag } from 'ui';

export default function AllMdxLayout({ data, description, title }) {
  const { edges } = data.allMdx;
  return (
    <Layout description={description} title={title}>
      <FlexList flexDirection="column" spacing={5} pt={4}>
        {edges.map(({ node }) => {
          const { excerpt, fields, frontmatter, id, timeToRead } = node;
          const { date, tags, title } = frontmatter;
          return (
            <FlexList key={id} flexDirection="column" spacing={1}>
              <Link to={fields.slug}>
                <Box as="h2">{title}</Box>
              </Link>
              <FlexList color="gray3" flexWrap="wrap" fontSize="small" pb={3}>
                <div>{date}</div>
                <div>{timeToRead}min</div>
                {tags &&
                  tags.map(tag => <Tag key={tag} to={tag} value={tag} />)}
              </FlexList>
              <Box color="gray2" fontFamily="serif">
                {excerpt}
              </Box>
            </FlexList>
          );
        })}
      </FlexList>
    </Layout>
  );
}

AllMdxLayout.propTypes = {
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
              tags: PropTypes.arrayOf(PropTypes.string.isRequired),
              title: PropTypes.string,
            }),
            timeToRead: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
