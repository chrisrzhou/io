import PT from 'prop-types';
import React from 'react';

import Box from './Box';
import FlexList from './FlexList';

export default function CodeTokenList({ values }) {
  return (
    <FlexList flexWrap="wrap" spacing={1}>
      {values.map(value => (
        <Box as="code" key={value} mb={2} mr={2}>
          {value}
        </Box>
      ))}
    </FlexList>
  );
}

CodeTokenList.propTypes = {
  values: PT.arrayOf(PT.string).isRequired,
};
