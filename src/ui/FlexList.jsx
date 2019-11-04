import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Flex from './Flex';
import theme from './theme';

export default function FlexList({
  children,
  css,
  flexDirection,
  spacing = 3,
  ...rest
}) {
  const direction = flexDirection === 'column' ? 'bottom' : 'right';
  const marginValue = theme.space[spacing];
  return (
    <Flex
      css={`
        ${css};
        > :not(:last-child) {
          margin-${direction}: ${marginValue}px !important;
        }
      `}
      flexDirection={flexDirection}
      {...rest}
    >
      {children}
    </Flex>
  );
}

FlexList.propTypes = {
  children: PropTypes.node.isRequired,
  css: PropTypes.string,
  flexDirection: PropTypes.string,
  spacing: PropTypes.number,
};
