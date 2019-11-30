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
        name: 'posts',
        path: 'data/posts',
      },
    },
    'gatsby-transformer-sharp',
  ],
};
