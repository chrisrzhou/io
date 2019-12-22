import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { getGithubLink, getGithubSourceLink } from 'routes';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout
      description="Progressively imprinting myself digitally on the web, one commit at a time."
      title=".io"
    >
      <Flex alignItems="center" flexGrow={1} justifyContent="center" mt="-10vh">
        <blockquote>
          What <a href={getGithubSourceLink()}>data</a> I cannot render,{' '}
          <a href={getGithubLink()}>I</a> do not understand.
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
