import PropTypes from 'prop-types';

export const action = PropTypes.shape({
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
});

export const thumbnail = PropTypes.shape({
  id: PropTypes.string.isRequired,
  previewSrc: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
});
