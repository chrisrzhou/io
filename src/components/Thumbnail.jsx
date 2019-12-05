import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import * as customPropTypes from 'customPropTypes';
import { Box, Flex } from 'ui';

export default function Thumbnail({ height = 300, thumbnail }) {
  const { previewImageSrc, slug, title } = thumbnail;

  return (
    <Box
      as={Link}
      css={`
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
      to={slug}
    >
      <Box
        as="img"
        className="thumbnail-preview"
        css={`
          object-fit: cover;
        `}
        src={previewImageSrc}
        height={height}
        width="100%"
      />
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
  thumbnail: customPropTypes.thumbnail.isRequired,
};
