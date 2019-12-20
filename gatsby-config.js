require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'chrisrzhou.io',
    description: 'A digital imprint of myself on the web',
    author: '@chrisrzhou',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'chrisrzhou.io',
        short_name: 'chrisrzhou',
        start_url: '/',
        background_color: '#050511',
        theme_color: '#7171a5',
        display: 'minimal-ui',
        icon: 'favicon.ico',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'art',
        path: 'data/art',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'ctf',
        path: 'data/ctf',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: 'data/posts',
      },
    },
    {
      resolve: 'gatsby-source-github-api',
      options: {
        token: process.env.GITHUB_API_TOKEN,
        variables: {
          allReposQuery:
            'user:chrisrzhou is:public archived:false topic:io sort:stars',
        },
        graphQLQuery: `
          query github($allReposQuery: String!) {
            repos: search(query: $allReposQuery, type: REPOSITORY, first: 50) {
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    description
                    homepageUrl
                    url
                    pushedAt
                    openGraphImageUrl
                    repositoryTopics(first: 50) {
                      edges {
                        node {
                          id
                          topic {
                            id
                            name
                          }
                        }
                      }
                    }
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        `,
      },
    },
    'gatsby-transformer-sharp',
  ],
};
