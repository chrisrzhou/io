import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { Box, Container, Flex, theme } from 'ui';

export default function Layout({
  children,
  description,
  headerExtraContent,
  title,
}) {
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
      <Flex
        css={`
          height: 100vh;
          overflow: auto;
          scroll-behavior: smooth;
        `}
        flexDirection="column"
      >
        <Header extraContent={headerExtraContent} />
        <Container
          as="main"
          css={`
            flex-grow: 1;
          `}
          pb={6}
        >
          {title && (
            <Box as="h1" p={0}>
              {title}
            </Box>
          )}
          {children}
        </Container>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  headerExtraContent: PropTypes.node,
  title: PropTypes.string,
};
