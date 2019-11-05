import { globalHistory } from '@reach/router';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { Box, Header as UIHeader } from 'ui';
import * as routes from 'routes';

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

export default function Header({ extraContent }) {
  const navcrumbs = getNavcrumbs();
  const mainContent = (
    <Box className="truncate" fontFamily="monospace" fontSize="tiny">
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
  return <UIHeader mainContent={mainContent} extraContent={extraContent} />;
}

Header.propTypes = {
  extraContent: PropTypes.node,
};
