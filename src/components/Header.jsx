import { Link } from 'gatsby';
import React from 'react';

import { Box, Container } from './ui';
import * as routes from 'routes';

function getNavcrumbs() {
  let route = '';
  return window.location.pathname
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

export default function Header() {
  const navcrumbs = getNavcrumbs();
  return (
    <Container
      as="header"
      backgroundColor="background"
      css={`
        align-items: center;
        display: flex;
        height: var(--header-height);
        overflow: hidden;
        position: sticky;
        top: 0;
        z-index: var(--header-z-index);
      `}
      color="primary"
      fontFamily="monospace"
      fontSize="tiny"
    >
      <Box
        css={`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        {navcrumbs.length > 0 ? (
          <>
            <Link to={routes.HOME}>~</Link>
            {navcrumbs}
          </>
        ) : (
          <Link to={routes.HOME}>~/chrisrzhou.io</Link>
        )}
      </Box>
    </Container>
  );
}
