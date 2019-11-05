import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { FlexList, Icon, InfoText, Modal, Tag } from 'ui';
import { useToggle } from 'hooks';

export default function Tags({ tags }) {
  const [shown, show, hide] = useToggle(false);

  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <Icon as="a" icon="hash" onClick={show} title="Tags" size="large" />
      <Modal onDismiss={hide} shown={shown} title="Tags">
        <FlexList flexDirection="column" spacing={1}>
          {tags.length === 0 && <InfoText>No tags found.</InfoText>}
          {_.orderBy(tags, ['count', 'value'], ['desc', 'asc']).map(
            ({ count, pathname, value }) => (
              <Tag
                count={count}
                key={value}
                pathname={pathname}
                value={value}
                onClick={hide}
              />
            ),
          )}
        </FlexList>
      </Modal>
    </>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      pathname: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
