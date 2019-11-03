import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function Tag({ to, value }) {
  return (
    <Box fontSize="small" as={Link} to={to}>
      #{value}
    </Box>
  );
}

Tag.propTypes = {
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
