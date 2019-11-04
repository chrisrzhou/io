import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import * as routes from 'routes';
import { Container } from 'ui';

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

export default function Header({ extraContent }) {
  const navcrumbs = getNavcrumbs();
  return (
    <Container
      alignItems="center"
      as="header"
      css={`
        align-items: center;
        background: linear-gradient(
          to bottom,
          var(--background) 80%,
          rgba(0, 0, 0, 0) 100%
        );
        display: flex;
        flex-shrink: 0;
        justify-content: space-between;
        height: var(--header-height);
        overflow: hidden;
        position: sticky;
        top: 0;
        z-index: var(--header-z-index);
      `}
      fontFamily="monospace"
      fontSize="small"
    >
      {navcrumbs.length > 0 ? (
        <div className="truncate">
          <Link to={routes.HOME}>~</Link>
          {navcrumbs}
        </div>
      ) : (
        '~/chrisrzhou'
      )}
      {extraContent}
    </Container>
  );
}

Header.propTypes = {
  extraContent: PropTypes.node,
};
