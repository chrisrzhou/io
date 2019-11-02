import { Link } from 'gatsby';
import React from 'react';

import Image from 'components/Image';
import Layout from 'components/Layout';
import * as routes from 'routes';

export default function IndexPage() {
  return (
    <Layout description="A digital imprint of myself on the web.">
      <div style={{ maxWidth: 300, marginBottom: '1.45rem' }}>
        <Image />
      </div>
      <Link to={routes.WRITINGS}>Writings</Link>
      <Link to={routes.PROJECTS}>Projects</Link>
      <Link to={routes.DRAWINGS}>Drawings</Link>
      <Link to={routes.READINGS}>Readings</Link>
    </Layout>
  );
}
