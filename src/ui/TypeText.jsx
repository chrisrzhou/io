import PT from 'prop-types';
import React, { useEffect, useState } from 'react';

import Box from './Box';

export default function TypeText({ delay = 80, text, ...rest }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < text.length) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIndex(index + 1);
      }, delay);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, index, text.length]);

  return <Box {...rest}>{text.slice(0, index)}</Box>;
}

TypeText.propTypes = {
  delay: PT.number,
  text: PT.string.isRequired,
};
