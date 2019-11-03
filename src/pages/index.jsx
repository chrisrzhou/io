import { Link } from 'gatsby';
import React from 'react';

import Layout from 'components/Layout';
import * as routes from 'routes';

export default function IndexPage() {
  return (
    <Layout description="A digital imprint of myself on the web.">
      <Link to={routes.WRITINGS}>Writings</Link>
      <Link to={routes.PROJECTS}>Projects</Link>
      <Link to={routes.DRAWINGS}>Drawings</Link>
      <Link to={routes.READINGS}>Readings</Link>
    </Layout>
  );
}
