import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout subtitle="A digital imprint of myself on the web." title=".io">
      <Flex alignItems="center" height="60vh" justifyContent="center">
        <blockquote>
          What I cannot create, I do not understand.
          <cite>Richard Feynman</cite>
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
