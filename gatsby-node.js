const fastExif = require('fast-exif');
const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

function createCommonNodeFields({ actions, node, getNode }) {
  const { createNodeField } = actions;
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
}

exports.onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case 'Mdx': {
      createCommonNodeFields({ actions, node, getNode });
      break;
    }
    case 'ImageSharp': {
      createCommonNodeFields({ actions, node, getNode });
      const { absolutePath } = getNode(node.parent);
      fastExif.read(absolutePath).then(exifData => {
        if (exifData && exifData.exif) {
          const date = exifData.exif.DateTimeOriginal;
          createNodeField({
            node,
            name: `exif`,
            value: { date },
          });
        }
      });
      break;
    }
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const allPosts = await graphql(`
    query allPosts {
      allMdx(filter: { fields: { sourceInstanceName: { eq: "posts" } } }) {
        edges {
          node {
            id
            fields {
              slug
              sourceInstanceName
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
  allPosts.data.allMdx.edges.forEach(({ node }) => {
    const { id, fields, parent } = node;
    const { slug, sourceInstanceName } = fields;
    const fileAbsolutePath = parent.absolutePath;
    createPage({
      path: slug,
      component: path.resolve(`src/layouts/PostLayout.jsx`),
      context: {
        id,
        fileAbsolutePath,
        sourceInstanceName,
      },
    });
  });

  const allCtfs = await graphql(`
    query allCtfs {
      allMdx(filter: { fields: { sourceInstanceName: { eq: "ctf" } } }) {
        edges {
          node {
            id
            fields {
              slug
              sourceInstanceName
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
  allCtfs.data.allMdx.edges.forEach(({ node }) => {
    const { id, fields, parent } = node;
    const { slug, sourceInstanceName } = fields;
    const fileAbsolutePath = parent.absolutePath;
    createPage({
      path: slug,
      component: path.resolve(`src/layouts/CtfLayout.jsx`),
      context: {
        id,
        fileAbsolutePath,
        sourceInstanceName,
      },
    });
  });

  const allDrawings = await graphql(`
    query allDrawings {
      allImageSharp(filter: { fields: { sourceInstanceName: { eq: "art" } } }) {
        edges {
          node {
            id
            fields {
              sourceInstanceName
              slug
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
  allDrawings.data.allImageSharp.edges.forEach(({ node }) => {
    const { id, fields, parent } = node;
    const { slug, sourceInstanceName } = fields;
    const fileAbsolutePath = parent.absolutePath;
    createPage({
      path: slug,
      component: path.resolve(`src/layouts/ArtLayout.jsx`),
      context: {
        id,
        fileAbsolutePath,
        sourceInstanceName,
      },
    });
  });

  const allProjects = await graphql(`
    query allProjects {
      githubData {
        data {
          repos {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  `);
  allProjects.data.githubData.data.repos.edges.map(({ node }) => {
    const { id, name } = node;
    createPage({
      path: `/projects/${name}`,
      component: path.resolve(`src/layouts/ProjectLayout.jsx`),
      context: {
        id,
        sourceInstanceName: 'projects',
      },
    });
  });
};
