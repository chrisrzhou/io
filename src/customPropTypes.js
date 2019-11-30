import PropTypes from 'prop-types';

export const action = PropTypes.shape({
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
});
