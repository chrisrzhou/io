import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Box from './Box';
import Container from './Container';
import Flex from './Flex';
import InfoText from './InfoText';
import Icon from './Icon';

export default function Modal({
  children,
  isFullViewport = false,
  onDismiss,
  shown,
  subtitle,
  title,
}) {
  useEffect(() => {
    if (shown) {
      document.body.className = 'no-scroll';
    }
    return () => {
      document.body.className = '';
    };
  }, [shown]);

  if (!shown) {
    return null;
  }

  const modalContainerProps = {
    bg: 'background',
    css: `
      animation: 0.5s grow, 0.5s fade-in;
      border: 1px solid var(--color-primary);
    `,
    onClick: e => e.stopPropagation(),
  };

  if (isFullViewport) {
    modalContainerProps.height = '100vh';
    modalContainerProps.width = '100vw';
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
      <Container {...modalContainerProps}>
        <Flex
          flexDirection="column"
          height="100%"
          maxHeight={isFullViewport ? '100vh' : ['100vh', '70vh']}
          pb={4}
          pt={3}
        >
          <Box pb={3}>
            <Flex flexShrink={0} justifyContent="space-between">
              <h2 className="truncate">{title}</h2>
              <Icon as="a" icon="close" onClick={onDismiss} title="close" />
            </Flex>
            {subtitle && <InfoText flexShrink={0}>{subtitle}</InfoText>}
          </Box>
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
  isFullViewport: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};
