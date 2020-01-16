import PT from 'prop-types';
import React from 'react';

import * as customPropTypes from 'customPropTypes';
import { Flex, Icon } from 'ui';

export default function Actions({ actions = [], source }) {
  const mergedActions = [...actions];

  if (source) {
    mergedActions.push({
      href: source,
      icon: 'code',
      title: 'source',
    });
  }

  if (mergedActions.length === 0) {
    return null;
  }

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
      {mergedActions.map(({ href, icon, onClick, title }) => (
        <Icon
          as="a"
          href={href}
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
  actions: PT.arrayOf(customPropTypes.action.isRequired),
  source: PT.string,
};
