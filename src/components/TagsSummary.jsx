import PropTypes from 'prop-types';
import React from 'react';

import { FlexList, InfoText, Tag } from 'ui';

export default function TagsSummary({
  direction = 'column',
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
  direction: PropTypes.oneOf(['column', 'row']),
  onSelectTag: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
