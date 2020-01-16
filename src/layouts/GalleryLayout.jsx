import PT from 'prop-types';
import React from 'react';

import Thumbnail from 'components/Thumbnail';
import * as customPropTypes from 'customPropTypes';
import WithTagsLayout from 'layouts/WithTagsLayout';

function renderEntry(entry) {
  return <Thumbnail thumbnail={entry} />;
}

export default function GalleryLayout({ thumbnails, title }) {
  return (
    <WithTagsLayout
      entries={thumbnails}
      renderEntry={renderEntry}
      title={title}
    />
  );
}

GalleryLayout.propTypes = {
  thumbnails: PT.arrayOf(customPropTypes.thumbnail.isRequired).isRequired,
  title: PT.string.isRequired,
};
