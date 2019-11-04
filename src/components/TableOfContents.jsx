import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { FlexList, Icon, Modal } from 'ui';

function renderContents(contents, onClick, depth = 0) {
  return (contents.items || []).map(item => (
    <FlexList color="gray3" flexDirection="column" key={item.url} spacing={1}>
      <FlexList spacing={1}>
        <div>{'#'.repeat(depth + 1)}</div>
        <a href={item.url} onClick={onClick}>
          {item.title}
        </a>
      </FlexList>
      {renderContents(item, onClick, depth + 1)}
    </FlexList>
  ));
}

export default function TableOfContents({ contents }) {
  const [shown, setShown] = useState(false);

  if (!contents.items) {
    return null;
  }

  function show() {
    setShown(true);
  }

  function hide() {
    setShown(false);
  }

  return (
    <>
      <Icon
        as="a"
        icon="book"
        onClick={show}
        title="Table of contents"
        size="large"
      />
      <Modal onDismiss={hide} shown={shown} title="Table of Contents">
        {renderContents(contents, hide)}
      </Modal>
    </>
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
