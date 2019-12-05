import PropTypes from 'prop-types';

export const action = PropTypes.shape({
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
});

export const thumbnail = PropTypes.shape({
  id: PropTypes.string.isRequired,
  previewImageSrc: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
});
