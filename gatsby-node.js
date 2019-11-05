const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case 'Mdx': {
      const { sourceInstanceName } = getNode(node.parent);
      const filePath = createFilePath({
        node,
        getNode,
        trailingSlash: false,
      });
      createNodeField({
        name: 'sourceInstanceName',
        node,
        value: sourceInstanceName,
      });
      createNodeField({
        name: 'slug',
        node,
        value: `/${sourceInstanceName}${filePath}`,
      });
      break;
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              sourceInstanceName
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query');
  }
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    const { fields, id } = node;
    const { slug, sourceInstanceName } = fields;
    createPage({
      path: slug,
      component: path.resolve(`src/layouts/MdxLayout.jsx`),
      context: {
        id,
        sourceInstanceName,
      },
    });
  });
};
