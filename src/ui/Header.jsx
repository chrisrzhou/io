import PropTypes from 'prop-types';
import React from 'react';

import Container from './Container';

export default function Header({ extraContent, mainContent }) {
  return (
    <Container
      alignItems="center"
      as="header"
      css={`
        align-items: center;
        background: linear-gradient(
          to bottom,
          var(--background) 80%,
          rgba(0, 0, 0, 0) 100%
        );
        display: flex;
        flex-shrink: 0;
        justify-content: space-between;
        height: var(--header-height);
        overflow: hidden;
        position: sticky;
        top: 0;
        z-index: var(--header-z-index);
      `}
    >
      {mainContent}
      {extraContent}
    </Container>
  );
}

Header.propTypes = {
  extraContent: PropTypes.node,
  mainContent: PropTypes.node.isRequired,
};
