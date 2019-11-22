import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Container from './Container';
import Flex from './Flex';
import Header from './Header';

export default function Layout({
  action,
  children,
  footer,
  header,
  subtitle,
  title,
}) {
  return (
    <Flex
      css={`
        animation 0.5s ease fade-in;
        background: var(--color-background);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      `}
      flexDirection="column"
    >
      <Header action={action}>{header}</Header>
      <Flex
        css={`
          margin-top: var(--height-header);
          overflow-y: scroll;
          scroll-behavior: smooth;
          scrollbar-color: var(--color-gray3) var(--color-background);
          scrollbar-width: thin;
        `}
        flexDirection="column"
        flexGrow={1}
      >
        <Container flexGrow={1}>
          {title && (
            <Box as="h1" p={0}>
              {title}
            </Box>
          )}
          {subtitle && (
            <Box color="gray3" fontSize="s">
              {subtitle}
            </Box>
          )}
          <Box pb={5} pt={4}>
            {children}
          </Box>
        </Container>
        {footer}
      </Flex>
    </Flex>
  );
}

Layout.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  header: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};
