import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { Box, Container, InfoText, Flex, theme } from 'ui';

export default function Layout({
  children,
  description,
  headerExtraContent,
  subtitle,
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
          min-height: 100vh;
        `}
        flexDirection="column"
      >
        <Header extraContent={headerExtraContent} />
        <Container
          as="main"
          css={`
            flex-grow: 1;
            margin-top: var(--header-height);
          `}
        >
          {title && (
            <Box as="h1" p={0}>
              {title}
            </Box>
          )}
          {subtitle && <InfoText>{subtitle}</InfoText>}
          <Box pb={6} pt={3}>
            {children}
          </Box>
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
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
