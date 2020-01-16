import PT from 'prop-types';

export const action = PT.shape({
  icon: PT.string.isRequired,
  onClick: PT.func.isRequired,
  title: PT.string.isRequired,
});

export const thumbnail = PT.shape({
  id: PT.string.isRequired,
  externalUrl: PT.string,
  previewImageSrc: PT.string.isRequired,
  slug: PT.string,
  tags: PT.arrayOf(PT.string.isRequired).isRequired,
  title: PT.string.isRequired,
});
