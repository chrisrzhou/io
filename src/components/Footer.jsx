import { Link } from 'gatsby';
import React from 'react';
import { Flex } from 'rebass';

import * as routes from 'routes';
import { FlexList, Icon } from './ui';

export default function Footer() {
  return (
    <Flex
      alignItems="baseline"
      as="footer"
      css={`
        bottom: 0;
        position: absolute;
        width: 100%;
      `}
      fontSize={['tiny', 'small']}
      justifyContent="space-between"
      px={3}
      py={2}
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
