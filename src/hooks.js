import { useCallback, useEffect, useState } from 'react';

export function useHotkey(keyMap) {
  const handleKeydown = useCallback(
    e => {
      if (e.key in keyMap) {
        const handler = keyMap[e.key];
        handler && handler();
      }
    },
    [keyMap],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);
}

export function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(true), () => setValue(false)];
}
