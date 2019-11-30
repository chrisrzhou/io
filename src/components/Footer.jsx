import { Link } from 'gatsby';
import React from 'react';

import * as routes from 'routes';
import { FlexList } from 'ui';

const links = [
  { label: 'Hacks', to: routes.HACKS },
  { label: 'Posts', to: routes.POSTS },
  { label: 'Art', to: routes.ART },
  { label: 'About', to: routes.ABOUT },
];

export default function Footer() {
  return (
    <FlexList
      as="footer"
      bg="background"
      css={`
        bottom: 0;
        position: fixed;
      `}
      flexWrap="wrap"
      fontFamily="monospace"
      fontSize="s"
      py={1}
      width="100%"
    >
      {links.map(({ label, to }) => (
        <Link key={to} to={to}>
          {label}
        </Link>
      ))}
    </FlexList>
  );
}
