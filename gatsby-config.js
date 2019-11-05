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
        theme_color: '#72728b',
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
    'gatsby-plugin-sharp',
    'gatsby-plugin-remove-trailing-slashes',
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
        name: 'books',
        path: 'data/books',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: 'data/blog',
      },
    },
    'gatsby-transformer-sharp',
  ],
};
