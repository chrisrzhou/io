import PropTypes from 'prop-types';
import React from 'react';

import Flex from './Flex';

export default function Header({ action, children }) {
  return (
    <Flex
      alignItems="center"
      css={`
        height: var(--height-header);
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      `}
      justifyContent="space-between"
      px={3}
    >
      {children}
      {action}
    </Flex>
  );
}

Header.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
};
