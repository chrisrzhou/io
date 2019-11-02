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
        background_color: 'white',
        theme_color: 'black',
        display: 'minimal-ui',
        icon: 'data/images/favicon.ico',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
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
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'drawings',
        path: 'data/drawings',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'readings',
        path: 'data/readings',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'writings',
        path: 'data/writings',
      },
    },
    'gatsby-transformer-sharp',
  ],
};
