import React, { useCallback, useState, useEffect } from "react";
import { debounce } from 'lodash';

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSave = useCallback(
    debounce((nextValue) => {
      setDebouncedValue(nextValue);
    }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSave(value);
    return debouncedSave.cancel; // Cancela o debounce ao desmontar o componente
  }, [value, debouncedSave]);

  return debouncedValue;
};

export default useDebouncedValue;