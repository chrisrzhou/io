import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout
      description="A digital imprint of myself on the web."
      title=".io"
    >
      <Flex alignItems="center" flexGrow={1} justifyContent="center" mt="-10vh">
        <blockquote>
          What I cannot create, I do not understand.
          <cite>Richard Feynman</cite>
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
