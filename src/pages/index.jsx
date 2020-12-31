import { Link } from 'gatsby';
import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { getGithubLink, getGithubSourceLink } from 'routes';
import * as routes from 'routes';
import { FlexList } from 'ui';

const links = [
  { label: 'About', to: routes.ABOUT },
  { label: 'Projects', to: routes.PROJECTS },
  { label: 'Posts', to: routes.POSTS },
  { label: 'Books', to: routes.BOOKS },
  { label: 'Art', to: routes.ART },
  { label: 'CTF', to: routes.CTF },
  { label: 'Resume', to: routes.RESUME },
];

export default function IndexPage() {
  const description = (
    <>
      Imprinting <a href={getGithubSourceLink()}>myself</a> digitally on the
      web, one <a href={getGithubLink('io/commits')}>commit</a> at a
      time.
    </>
  );
  return (
    <PageLayout description={description} title=".io">
      <FlexList alignItems="flex-start" flexDirection="column">
        {links.map(({ label, to }) => (
          <Link key={to} to={to}>
            <h2>{label}</h2>
          </Link>
        ))}
      </FlexList>
    </PageLayout>
  );
}
