import PT from 'prop-types';
import React from 'react';

import FlexList from './FlexList';

export default function MentionList({ mentions }) {
  return (
    <FlexList flexWrap="wrap">
      {mentions.map(({ name, url }) => (
        <a key={name} href={url}>
          @{name}
        </a>
      ))}
    </FlexList>
  );
}

MentionList.propTypes = {
  mentions: PT.arrayOf(
    PT.shape({
      name: PT.string.isRequired,
      url: PT.string.isRequired,
    }),
  ).isRequired,
};
