import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { getGithubLink, getGithubSourceLink } from 'routes';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout
      description="A digital imprint of myself on the web."
      source={getGithubLink('io')}
      title=".io"
    >
      <Flex alignItems="center" flexGrow={1} justifyContent="center" mt="-10vh">
        <blockquote>
          What <a href={getGithubSourceLink()}>data</a> I cannot render, <a href={getGithubLink()}>I</a> do
          not understand.
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
