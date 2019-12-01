import { globalHistory } from '@reach/router';
import { Link } from 'gatsby';
import React from 'react';

import * as routes from 'routes';
import { Flex, TypeText } from 'ui';

export default function Header() {
  let route = '';
  const navcrumbs = globalHistory.location.pathname
    .split('/')
    .filter(path => path)
    .reduce(
      (paths, path) => {
        const label = `/${path}`;
        route += label;
        return [
          ...paths,
          {
            label,
            route,
          },
        ];
      },
      [{ route: routes.HOME, label: 'chrisrzhou' }],
    );

  return (
    <Flex
      alignItems="center"
      as="header"
      bg="background"
      css={`
        position: sticky;
        top: 0;
        z-index: var(--z-index-header);
      `}
      fontFamily="monospace"
      fontSize="s"
      py={1}
    >
      {navcrumbs.map(({ label, route }, i) => {
        return (
          <Flex flexShrink={0} key={route}>
            <Link to={route}>
              {i < navcrumbs.length - 1 ? label : <TypeText text={label} />}
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
}
