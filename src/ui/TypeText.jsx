import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Box from './Box';

export default function TypeText({ delay = 50, text }) {
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

  return <Box>{text.slice(0, index)}</Box>;
}

TypeText.propTypes = {
  delay: PropTypes.number,
  text: PropTypes.string.isRequired,
};
