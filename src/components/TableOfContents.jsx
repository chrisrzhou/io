import PropTypes from 'prop-types';
import React from 'react';

import { Box, FlexList } from './ui';

function renderContents(contents, depth = 0) {
  return (contents.items || []).map(item => (
    <FlexList color="gray3" flexDirection="column" key={item.url} spacing={1}>
      <FlexList spacing={1}>
        <div>{'#'.repeat(depth + 1)}</div>
        <a href={item.url}>{item.title}</a>
      </FlexList>
      {renderContents(item, depth + 1)}
    </FlexList>
  ));
}

export default function TableOfContents({ contents }) {
  if (!contents.items) {
    return null;
  }
  return (
    <Box
      css={`
        position: absolute;
        right: 0;
        top: 0;
        z-index: var(--toc-z-index);
      `}
    >
      {renderContents(contents)}
    </Box>
  );
}

const nodeShape = {
  items: PropTypes.arrayOf(PropTypes.shape(this).isRequired),
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

TableOfContents.propTypes = {
  contents: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape(nodeShape).isRequired),
  }),
};
