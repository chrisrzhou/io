import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import { TAG_SEARCH_PARAM } from 'enums';
import Box from './Box';

export default function Tag({ count, onClick, pathname, value, ...rest }) {
  return (
    <Box
      as="a"
      fontSize="small"
      onClick={() => {
        navigate(`${pathname}?${TAG_SEARCH_PARAM}=${value}`);
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
