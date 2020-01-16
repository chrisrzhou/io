import PT from 'prop-types';
import React, { useEffect } from 'react';

import Box from './Box';
import Container from './Container';
import Flex from './Flex';
import InfoText from './InfoText';
import Icon from './Icon';

export default function Modal({
  children,
  description,
  onDismiss,
  shown,
  title,
}) {
  // prevent document from scrolling when modal is shown
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
          height={['100vh', '100%']}
          maxHeight={['100vh', '70vh']}
          pb={4}
          pt={3}
        >
          <Box pb={3}>
            <Flex flexShrink={0} justifyContent="space-between">
              <h2 className="truncate">{title}</h2>
              <Icon as="a" icon="close" onClick={onDismiss} title="close" />
            </Flex>
            {description && <InfoText flexShrink={0}>{description}</InfoText>}
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
  children: PT.node.isRequired,
  description: PT.node,
  onDismiss: PT.func.isRequired,
  shown: PT.bool.isRequired,
  title: PT.string.isRequired,
};
