import React, {useEffect} from 'react';
import {useState} from 'react';

//para que no cargue la búsqueda hasta que dejemos de escribir
//useeffect para que se resetee el tiempo uando se carga
export const useDebounceValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};
