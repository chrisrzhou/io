import { Link } from 'gatsby';
import React, { useState } from 'react';

import * as customPropTypes from 'customPropTypes';
import { Box, FlexList, TypeText } from 'ui';

export default function Thumbnail({ thumbnail }) {
  const [showDetail, setShowDetail] = useState(false);

  const { previewSrc, slug, subtitle, title } = thumbnail;

  return (
    <Box
      as={Link}
      css={`
        position: relative;
      `}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
      to={slug}
    >
      <Box
        as="img"
        css={`
          object-fit: cover;
          transition: filter 0.3s ease-in-out;
          width: 100%;

          :hover {
            filter: brightness(1.3);
          }
        `}
        src={previewSrc}
        style={{ height: 300 }}
      />
      {showDetail && (
        <FlexList
          alignItems="baseline"
          css={`
            animation: 0.3s fade-in;
            background: var(--color-backgroundAlpha);
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
          `}
          justifyContent="space-between"
          p={2}
          spacing={0}
        >
          <h2>
            <TypeText text={title} />
          </h2>
          <Box color="gray3" fontSize="s">
            {subtitle}
          </Box>
        </FlexList>
      )}
    </Box>
  );
}

Thumbnail.propTypes = {
  thumbnail: customPropTypes.thumbnail.isRequired,
};
