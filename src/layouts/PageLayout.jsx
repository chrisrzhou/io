import { ThemeProvider } from 'emotion-theming';
import PT from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import Actions from 'components/Actions';
import Header from 'components/Header';
import * as customPropTypes from 'customPropTypes';
import { Box, Container, Flex, InfoText, theme } from 'ui';

export default function PageLayout({
  actions = [],
  children,
  description,
  source,
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
            animation: 0.5s fade-in;
            min-height: 100vh;
            overflow-wrap: break-word;
            padding-top: var(--header-height);
          `}
          flexDirection="column"
          overflow="hidden"
        >
          <Header />
          <Flex as="main" flexDirection="column" flexGrow={1} pb={5} pt={2}>
            <Actions actions={actions} source={source} />
            <Box flexShrink={0}>
              <h1>{title}</h1>
              <InfoText pb={4} pt={1}>
                {description}
              </InfoText>
            </Box>
            {children}
          </Flex>
        </Flex>
      </Container>
    </ThemeProvider>
  );
}

PageLayout.propTypes = {
  actions: PT.arrayOf(customPropTypes.action.isRequired),
  children: PT.node.isRequired,
  description: PT.node,
  source: PT.string,
  title: PT.string.isRequired,
};
