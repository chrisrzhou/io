import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { getGithubSourceLink } from 'routes';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout
      description="A digital imprint of myself on the web."
      title=".io"
    >
      <Flex alignItems="center" flexGrow={1} justifyContent="center" mt="-10vh">
        <blockquote>
          What <a href={getGithubSourceLink()}>data</a> I cannot render, I do
          not understand.
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
