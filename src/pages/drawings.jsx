import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import Layout from 'layouts/Layout';
import { Box, FlexList } from 'ui';

export default function DrawingsPage({ data }) {
  return (
    <Layout description="Mostly ink drawings" title="Drawings">
      <FlexList flexDirection="column" spacing={4}>
        {data.allImageSharp.edges.map(({ node }) => {
          const { fields, fluid, id } = node;
          return (
            <Box
              as={Link}
              css={`
                position: relative;
              `}
              key={id}
              to={fields.slug}
            >
              <Box
                css={`
                  :hover {
                    filter: brightness(110%);
                  }
                `}
              >
                <Image fluid={fluid} style={{ height: 300 }} />
                <Box
                  css={`
                    position: absolute;
                    top: 0;
                  `}
                >
                  {fluid.originalName}
                </Box>
              </Box>
            </Box>
          );
        })}
      </FlexList>
    </Layout>
  );
}

DrawingsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query allDrawings {
    allImageSharp(sort: { order: DESC, fields: [fields___exif___date] }) {
      edges {
        node {
          id
          ... on ImageSharp {
            fluid(maxWidth: 800) {
              aspectRatio
              src
              srcSet
              sizes
              originalName
            }
            fields {
              slug
              exif {
                date(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    }
  }
`;
