import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';

export default function Iframe({
  loadingMessage = 'Loading...',
  scale = 0.5,
  src,
}) {
  const containerSize = `${(1 / scale) * 100}%`;
  return (
    <Box
      css={`
        position: relative;
        ::after {
          content: '${loadingMessage}';
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          position: absolute;
          z-index: -1;
        }
      `}
      flexGrow={1}
      height={0}
      overflow="hidden"
    >
      <Box
        as="iframe"
        css={`
          border: 0;
          height: ${containerSize};
          transform: scale(${scale});
          transform-origin: 0 0;
          width: ${containerSize};
        `}
        src={src}
      />
    </Box>
  );
}

Iframe.propTypes = {
  loadingMessage: PropTypes.string,
  scale: PropTypes.number,
  src: PropTypes.string.isRequired,
};
