import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import { Box, Container } from './ui';
import Footer from './Footer';
import Header from './Header';
import theme from 'theme';

export default function Layout({ children, description, title }) {
  // force-scroll to hash if it exists
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      location.hash = hash;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: 'description',
            content: description,
          },
        ]}
        title={title}
      />
      <Header />
      <Container as="main" pb={6}>
        <Box as="h1" pb={0} pt={3}>
          {title}
        </Box>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
};
