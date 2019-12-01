import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function InfoText({ children, ...rest }) {
  return (
    <Box color="gray3" fontSize="s" {...rest}>
      {children}
    </Box>
  );
}

InfoText.propTypes = {
  children: PropTypes.node.isRequired,
};
