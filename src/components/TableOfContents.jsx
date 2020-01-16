import PT from 'prop-types';
import React from 'react';

import { FlexList, InfoText } from 'ui';

function renderContents(contents, onSelectContent, depth = 0) {
  return (contents.items || []).map(item => (
    <FlexList flexDirection="column" key={item.url} spacing={1}>
      <FlexList alignItems="baseline" spacing={1}>
        <InfoText>{'#'.repeat(depth + 1)}</InfoText>
        <a href={item.url} onClick={onSelectContent}>
          {item.title}
        </a>
      </FlexList>
      {renderContents(item, onSelectContent, depth + 1)}
    </FlexList>
  ));
}

export default function TableOfContents({ contents, onSelectContent }) {
  return renderContents(contents, onSelectContent);
}

const nodeShape = {
  items: PT.arrayOf(PT.shape(this).isRequired),
  title: PT.string.isRequired,
  url: PT.string.isRequired,
};

TableOfContents.propTypes = {
  contents: PT.shape({
    items: PT.arrayOf(PT.shape(nodeShape).isRequired),
  }),
  onSelectContent: PT.func.isRequired,
};
