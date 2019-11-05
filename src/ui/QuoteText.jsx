import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function QuoteText({ children }) {
  return (
    <Box color="gray2" fontFamily="serif">
      {children}
    </Box>
  );
}

QuoteText.propTypes = {
  children: PropTypes.node,
};
