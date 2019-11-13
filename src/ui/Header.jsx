import PropTypes from 'prop-types';
import React from 'react';

import Flex from './Flex';
import Container from './Container';

export default function Header({ extraContent, mainContent }) {
  return (
    <Container
      as="header"
      css={`
        align-items: center;
        display: flex;
        justify-content: space-between;
        background: linear-gradient(
          to bottom,
          var(--background) 80%,
          rgba(0, 0, 0, 0) 100%
        );
        left: 0;
        height: var(--header-height);
        position: fixed;
        right: 0;
        top: 0;
        z-index: var(--header-z-index);
      `}
    >
      <Flex
        alignItems="center"
        css={`
          width: 100%;
        `}
        justifyContent="space-between"
      >
        {mainContent}
        {extraContent}
      </Flex>
    </Container>
  );
}

Header.propTypes = {
  extraContent: PropTypes.node,
  mainContent: PropTypes.node.isRequired,
};
