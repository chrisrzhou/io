import { Link } from 'gatsby';
import React from 'react';

import PageLayout from 'layouts/PageLayout';
import * as routes from 'routes';
import { FlexList } from 'ui';

const links = [
  { label: 'Posts', to: routes.POSTS },
  { label: 'Hacks', to: routes.HACKS },
  { label: 'Drawings', to: routes.DRAWINGS },
  { label: 'Books', to: routes.BOOKS },
];

export default function IndexPage() {
  return (
    <PageLayout title="">
      <FlexList alignItems="center" flexDirection="column">
        {links.map(({ label, to }) => (
          <Link key={to} to={to}>
            <h2>{label}</h2>
          </Link>
        ))}
      </FlexList>
    </PageLayout>
  );
}
