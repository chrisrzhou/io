import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function InfoText({ children }) {
  return (
    <Box color="gray3" fontSize="small">
      {children}
    </Box>
  );
}

InfoText.propTypes = {
  children: PropTypes.node,
};
