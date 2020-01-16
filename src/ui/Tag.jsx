import { navigate } from '@reach/router';
import PT from 'prop-types';
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
  count: PT.number,
  onClick: PT.func,
  pathname: PT.string.isRequired,
  value: PT.string.isRequired,
};
