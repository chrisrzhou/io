import PropTypes from 'prop-types';
import React from 'react';

import Icon from './Icon';
import Layout from './Layout';

export default function Modal({ children, onDismiss, shown, title }) {
  if (!shown) {
    return null;
  }

  return (
    <Layout
      action={
        <Icon as="a" icon="close" onClick={onDismiss} size="l" title="close" />
      }
      header={<div />}
      title={title}
    >
      {children}
    </Layout>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
