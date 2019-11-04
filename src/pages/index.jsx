import { Link } from 'gatsby';
import React from 'react';

import Layout from 'layouts/Layout';
import { FlexList } from 'ui';
import * as routes from 'routes';

const links = [
  { label: 'Blog', to: routes.BLOG },
  { label: 'Work', to: routes.WORK },
  { label: 'Art', to: routes.ART },
  { label: 'Books', to: routes.BOOKS },
];

export default function IndexPage() {
  return (
    <Layout description="A digital imprint of myself on the web.">
      <FlexList
        alignItems="center"
        css={`
          height: 100%;
        `}
        justifyContent="center"
        flexDirection="column"
      >
        {links.map(({ label, to }) => (
          <Link key={to} to={to}>
            <h2>{label}</h2>
          </Link>
        ))}
      </FlexList>
    </Layout>
  );
}
