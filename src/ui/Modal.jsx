import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Container from './Container';
import Flex from './Flex';
import Icon from './Icon';
import { useHideScroll, useHotkey } from 'hooks';

export default function Modal({ children, onDismiss, shown, title }) {
  useHideScroll(document.body, shown);
  useHotkey({ Escape: onDismiss });

  if (!shown) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      bg="rgba(0, 0, 0, 0.8)"
      css={`
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: var(--z-index-modal);
      `}
      onClick={onDismiss}
    >
      <Container
        bg="background"
        css={`
          animation: grow 0.5s, fade-in 1s;
          border: 1px solid var(--color-primary);
        `}
        onClick={e => e.stopPropagation()}
        px={4}
        py={3}
      >
        <Flex flexDirection="column">
          <Flex pb={3} flexShrink={0} justifyContent="space-between">
            <h2>{title}</h2>
            <Icon as="a" icon="close" onClick={onDismiss} title="close" />
          </Flex>
          <Box flexGrow={1} maxHeight="60vh" overflow="auto">
            {children}
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
