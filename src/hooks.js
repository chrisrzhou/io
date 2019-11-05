import { useState } from 'react';

export function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(true), () => setValue(false)];
}
