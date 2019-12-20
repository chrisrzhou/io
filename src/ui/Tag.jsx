import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import { searchTag } from 'routes';

export default function Tag({ count, onClick, pathname, value, ...rest }) {
  return (
    <Box
      as="a"
      fontSize="s"
      onClick={() => {
        navigate(searchTag(pathname, value));
        onClick && onClick();
      }}
      {...rest}
    >
      #{value}
      {count ? ` (${count})` : ''}
    </Box>
  );
}

Tag.propTypes = {
  count: PropTypes.number,
  onClick: PropTypes.func,
  pathname: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
