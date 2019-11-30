import React from 'react';

import Box from './Box';

export default function Container({ ...rest }) {
  return <Box mx={['unset', 'auto']} px={4} width={['100%', 768]} {...rest} />;
}
