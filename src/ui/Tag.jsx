import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function Tag({ as, value, ...rest }) {
  const elementType = as || 'a';
  return (
    <Box as={elementType} fontSize="small" {...rest}>
      #{value}
    </Box>
  );
}

Tag.propTypes = {
  as: PropTypes.elementType,
  value: PropTypes.string.isRequired,
};
