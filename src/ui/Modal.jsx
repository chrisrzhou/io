import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Flex from './Flex';
import FlexList from './FlexList';
import Icon from './Icon';

export default function Modal({ children, onDismiss, shown, title }) {
  if (!shown) {
    return null;
  }

  return (
    <FlexList
      css={`
        background: var(--background);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: var(--modal-z-index);
      `}
      flexDirection="column"
      p={3}
    >
      <Flex color="gray1" fontSize="large" justifyContent="space-between">
        <div>{title}</div>
        <Icon
          as="a"
          icon="close"
          onClick={onDismiss}
          size="large"
          title="close"
        />
      </Flex>
      <Box
        css={`
          height: 100%;
          overflow: auto;
        `}
      >
        {children}
      </Box>
    </FlexList>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
