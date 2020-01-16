import PT from 'prop-types';
import React from 'react';

import { FlexList, InfoText, Tag } from 'ui';

export default function TagsSummary({
  direction = 'row',
  onSelectTag,
  pathname,
  tags,
}) {
  const isColumn = direction === 'column';
  return (
    <FlexList
      flexDirection={direction}
      flexWrap="wrap"
      spacing={isColumn ? 1 : 3}
    >
      {tags.length === 0 && <InfoText>No tags found.</InfoText>}
      {tags.map(({ count, value }) => (
        <Tag
          count={count}
          key={value}
          pathname={pathname}
          value={value}
          onClick={onSelectTag}
        />
      ))}
    </FlexList>
  );
}

TagsSummary.propTypes = {
  direction: PT.oneOf(['column', 'row']),
  onSelectTag: PT.func,
  pathname: PT.string.isRequired,
  tags: PT.arrayOf(
    PT.shape({
      count: PT.number.isRequired,
      value: PT.string.isRequired,
    }).isRequired,
  ).isRequired,
};
