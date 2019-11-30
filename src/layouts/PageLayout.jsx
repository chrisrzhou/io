import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import Actions from 'components/Actions';
import Footer from 'components/Footer';
import Header from 'components/Header';
import * as customPropTypes from 'customPropTypes';
import { Box, Container, Flex, theme } from 'ui';

export default function PageLayout({
  actions = [],
  children,
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
      <Helmet htmlAttributes={{ lang: 'en' }} title={title} />
      <Container>
        <Flex
          css={`
            animation: fade-in 1s;
          `}
          flexDirection="column"
          minHeight="100vh"
        >
          <Header />
          <Box as="main" flexGrow={1} pb={5} pt={2}>
            <Actions actions={actions} />
            <h1>{title}</h1>
            <Box color="gray3" fontSize="s" pb={4}>
              {subtitle}
            </Box>
            {children}
          </Box>
          <Footer />
        </Flex>
      </Container>
    </ThemeProvider>
  );
}

PageLayout.propTypes = {
  actions: PropTypes.arrayOf(customPropTypes.action.isRequired),
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};
