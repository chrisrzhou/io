import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { FlexList, Tag } from 'ui';

export default function Tags({ onSelectTag, tags }) {
  return (
    <FlexList color="gray3" flexDirection="column" fontSize="s" spacing={1}>
      {tags.length === 0 && <div>No tags found.</div>}
      {_.orderBy(tags, ['count', 'value'], ['desc', 'asc']).map(
        ({ count, pathname, value }) => (
          <Tag
            count={count}
            key={value}
            pathname={pathname}
            value={value}
            onClick={onSelectTag}
          />
        ),
      )}
    </FlexList>
  );
}

Tags.propTypes = {
  onSelectTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      pathname: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
