import PropTypes from 'prop-types';
import React from 'react';

import * as customPropTypes from 'customPropTypes';
import { Box, Flex } from 'ui';

export default function Thumbnail({ height = 300, thumbnail, onClick }) {
  const { preview, title } = thumbnail;

  return (
    <Box
      css={`
        cursor: pointer;
        position: relative;

        .thumbnail-preview {
          filter: brightness(0.5);
          transform: scale(0.9);
          transition: 0.5s filter ease-in-out, 0.3s transform ease-in-out;
        }
        :hover .thumbnail-preview {
          filter: brightness(1);
          transform: scale(1);
        }

        .thumbnail-title {
          bottom: 0;
          color: var(--color-white);
          left: 0;
          opacity: 1;
          position: absolute;
          right: 0;
          top: 0;
          text-shadow: 1px 1px var(--color-gray3);
          transition: 0.5s opacity ease-in-out;
        }
        :hover .thumbnail-title {
          opacity: 0;
        }
      `}
      onClick={onClick}
    >
      <Box height={height} className="thumbnail-preview">
        {preview}
      </Box>
      <Flex
        alignItems="center"
        className="thumbnail-title"
        color="gray1"
        justifyContent="center"
      >
        <h2>{title}</h2>
      </Flex>
    </Box>
  );
}

Thumbnail.propTypes = {
  height: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  thumbnail: customPropTypes.thumbnail.isRequired,
};
