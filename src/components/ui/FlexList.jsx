import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Flex from './Flex';

export default function FlexList({
  children,
  flexDirection,
  spacing = 3,
  ...rest
}) {
  const isVertical = flexDirection === 'column';
  const childNodes = React.Children.toArray(children);
  return (
    <Flex flexDirection={flexDirection} {...rest}>
      {childNodes.map((childNode, i) => (
        <Box
          key={i}
          mb={isVertical && i < childNodes.length - 1 ? spacing : undefined}
          mr={!isVertical && i < childNodes.length - 1 ? spacing : undefined}
        >
          {childNode}
        </Box>
      ))}
    </Flex>
  );
}

FlexList.propTypes = {
  children: PropTypes.node.isRequired,
  flexDirection: PropTypes.string,
  spacing: PropTypes.number,
};
