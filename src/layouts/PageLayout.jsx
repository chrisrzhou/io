import { globalHistory } from '@reach/router';
import { ThemeProvider } from 'emotion-theming';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import * as routes from 'routes';
import { Box, Flex, FlexList, Icon, Layout, theme } from 'ui';

function getNavcrumbs() {
  let route = '';
  return globalHistory.location.pathname
    .split('/')
    .filter(path => path)
    .reduce((paths, path) => {
      route += `/${path}`;
      return [
        ...paths,
        {
          route,
          path,
        },
      ];
    }, [])
    .map(({ route, path }) => (
      <Link key={route} to={route}>
        /{path}
      </Link>
    ));
}

export default function PageLayout({ action, children, subtitle, title }) {
  // force-scroll to hash if it exists
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      location.hash = hash;
    }
  }, []);

  const navcrumbs = getNavcrumbs();

  const header = (
    <Box className="truncate" fontFamily="monospace" fontSize="s">
      {navcrumbs.length > 0 ? (
        <>
          <Link to={routes.HOME}>~</Link>
          {navcrumbs}
        </>
      ) : (
        '~/chrisrzhou'
      )}
    </Box>
  );

  const footer = (
    <Flex
      alignItems="baseline"
      fontFamily="monospace"
      fontSize="s"
      justifyContent="space-between"
      px={3}
      py={2}
    >
      <FlexList>
        <Icon as="a" href="mailto:chrisrzhou@pm.me" icon="mail" title="email" />
        <Icon
          as="a"
          href="https://github.com/chrisrzhou"
          icon="github"
          title="github"
        />
      </FlexList>
      <Link title="about" to={routes.ABOUT}>
        © {new Date().getFullYear()} Chris Zhou
      </Link>
    </Flex>
  );

  return (
    <ThemeProvider theme={theme}>
      <Helmet htmlAttributes={{ lang: 'en' }} title={title} />
      <Layout
        action={action}
        footer={footer}
        header={header}
        subtitle={subtitle}
        title={title}
      >
        {children}
      </Layout>
    </ThemeProvider>
  );
}

PageLayout.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};
