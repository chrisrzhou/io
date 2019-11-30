import PropTypes from 'prop-types';
import React from 'react';

import Thumbnail from 'components/Thumbnail';
import * as customPropTypes from 'customPropTypes';
import PageLayout from 'layouts/PageLayout';
import { FlexList } from 'ui';

export default function GalleryLayout({ subtitle, thumbnails, title }) {
  return (
    <PageLayout subtitle={subtitle} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {thumbnails.map(thumbnail => (
          <Thumbnail key={thumbnail.id} thumbnail={thumbnail} />
        ))}
      </FlexList>
    </PageLayout>
  );
}

GalleryLayout.propTypes = {
  subtitle: PropTypes.node,
  thumbnails: PropTypes.arrayOf(customPropTypes.thumbnail.isRequired)
    .isRequired,
  title: PropTypes.string.isRequired,
};
