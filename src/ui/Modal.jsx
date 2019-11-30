import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Box from './Box';
import Container from './Container';
import Flex from './Flex';
import Icon from './Icon';
import { useHotkey } from 'hooks';

export default function Modal({ children, onDismiss, shown, title }) {
  useEffect(() => {
    if (shown) {
      document.body.className = 'no-scroll';
    }
    return () => {
      document.body.className = '';
    };
  }, [shown]);

  useHotkey({ Escape: onDismiss });

  if (!shown) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      bg="backgroundAlpha"
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
          animation: 0.3s grow, 0.5s fade-in;
          border: 1px solid var(--color-primary);
        `}
        onClick={e => e.stopPropagation()}
      >
        <Flex
          flexDirection="column"
          maxHeight={['100vh', '70vh']}
          pb={4}
          pt={3}
        >
          <Flex pb={3} flexShrink={0} justifyContent="space-between">
            <h2>{title}</h2>
            <Icon as="a" icon="close" onClick={onDismiss} title="close" />
          </Flex>
          <Box flexGrow={1} overflow="auto">
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
