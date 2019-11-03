import { Link } from 'gatsby';
import React from 'react';

import * as routes from 'routes';
import { Flex, FlexList, Icon } from './ui';

export default function Footer() {
  return (
    <Flex
      alignItems="baseline"
      as="footer"
      css={`
        bottom: 0;
        position: absolute;
      `}
      fontFamily="monospace"
      fontSize="tiny"
      justifyContent="space-between"
      px={3}
      py={1}
      width="100%"
    >
      <FlexList>
        <Icon as="a" href="mailto:chrisrzhou@pm.me" icon="mail" title="email" />
        <Icon
          as="a"
          href="https://github.com/chrisrzhou"
          icon="github"
          title="github"
        />
      </FlexList>
      <Link title="about" to={routes.ABOUT}>
        © {new Date().getFullYear()} Chris Zhou
      </Link>
    </Flex>
  );
}
