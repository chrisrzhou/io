import React from 'react';

import Box from './Box';

export default function Container({ ...rest }) {
  return <Box mx="auto" px={3} width={['100%', 768]} {...rest} />;
}
