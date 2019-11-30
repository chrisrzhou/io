import React from 'react';

import Box from './Box';
import theme from './theme';

export default function Container({ ...rest }) {
  return (
    <Box
      mx={[undefined, 'auto']}
      px={4}
      width={['100%', theme.breakpointWidths.s]}
      {...rest}
    />
  );
}
