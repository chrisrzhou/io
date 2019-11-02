import { Link } from 'gatsby';
import React from 'react';

import { Container } from './ui';
import * as routes from 'routes';

export default function Navcrumbs() {
  let route = '';
  const crumbs = window.location.pathname
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
    }, []);
  return (
    crumbs.length > 0 && (
      <Container fontFamily="monospace" fontSize={['tiny', 'small']}>
        <Link to={routes.HOME}>~</Link>
        {crumbs.map(({ route, path }) => (
          <Link key={route} to={route}>
            /{path}
          </Link>
        ))}
      </Container>
    )
  );
}
