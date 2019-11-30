import PropTypes from 'prop-types';
import React from 'react';

import * as customPropTypes from 'customPropTypes';
import { Flex, Icon } from 'ui';

export default function Actions({ actions }) {
  return (
    <Flex
      bg="primary"
      css={`
        position: fixed;
        right: 0;
        top: 0;
      `}
      flexDirection="column"
    >
      {actions.map(({ icon, onClick, title }) => (
        <Icon
          as="a"
          color="background"
          icon={icon}
          key={icon}
          onClick={onClick}
          p={1}
          title={title}
        />
      ))}
    </Flex>
  );
}

Actions.propTypes = {
  actions: PropTypes.arrayOf(customPropTypes.action.isRequired),
};
