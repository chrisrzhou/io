import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Thumbnail from 'components/Thumbnail';
import * as customPropTypes from 'customPropTypes';
import { useToggle } from 'hooks';
import PageLayout from 'layouts/PageLayout';
import { FlexList, Modal } from 'ui';

export default function GalleryLayout({
  location,
  subtitle,
  thumbnailHeight,
  thumbnails,
  title,
}) {
  const [activeThumbnail, setActiveThumbnail] = useState();
  const [shown, show, hide] = useToggle(false);

  // ensure modal is closed when route updates
  useEffect(() => {
    setActiveThumbnail();
  }, [location.href]);

  return (
    <PageLayout subtitle={subtitle} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {thumbnails.map(thumbnail => (
          <Thumbnail
            height={thumbnailHeight}
            key={thumbnail.id}
            onClick={() => {
              setActiveThumbnail(thumbnail);
              show();
            }}
            thumbnail={thumbnail}
          />
        ))}
      </FlexList>
      {activeThumbnail && (
        <Modal
          isFullViewport
          onDismiss={() => {
            setActiveThumbnail();
            hide();
          }}
          shown={shown}
          subtitle={activeThumbnail.subtitle}
          title={activeThumbnail.title}
        >
          {activeThumbnail.render}
        </Modal>
      )}
    </PageLayout>
  );
}

GalleryLayout.propTypes = {
  location: PropTypes.object.isRequired,
  subtitle: PropTypes.node,
  thumbnailHeight: PropTypes.number,
  thumbnails: PropTypes.arrayOf(customPropTypes.thumbnail.isRequired)
    .isRequired,
  title: PropTypes.string.isRequired,
};
