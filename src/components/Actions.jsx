import PropTypes from 'prop-types';
import React from 'react';

import * as customPropTypes from 'customPropTypes';
import { Flex, Icon } from 'ui';

export default function Actions({ actions }) {
  return (
    <Flex
      css={`
        position: fixed;
        right: 0;
        top: 0;
        z-index: var(--z-index-action);
      `}
      flexDirection="column"
    >
      {actions.map(({ icon, onClick, title }) => (
        <Icon
          as="a"
          icon={icon}
          isInverted
          key={icon}
          onClick={onClick}
          title={title}
        />
      ))}
    </Flex>
  );
}

Actions.propTypes = {
  actions: PropTypes.arrayOf(customPropTypes.action.isRequired),
};
