import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { getGithubLink, getGithubSourceLink } from 'routes';
import { Flex } from 'ui';

export default function IndexPage() {
  return (
    <PageLayout description="" title=".io">
      <Flex alignItems="center" flexGrow={1} justifyContent="center" mt="-10vh">
        <blockquote>
          Imprinting <a href={getGithubSourceLink()}>myself</a> digitally on the
          web, one <a href={getGithubLink('io/commits/master')}>commit</a> at a
          time.
        </blockquote>
      </Flex>
    </PageLayout>
  );
}
