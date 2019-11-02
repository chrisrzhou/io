import React from 'react';
import { Box } from 'rebass';

export default function Container({ ...rest }) {
  return <Box mx="auto" px={3} py={2} width={['100%', 768]} {...rest} />;
}
