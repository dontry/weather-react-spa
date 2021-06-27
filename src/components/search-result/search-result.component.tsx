import React from 'react';
import { useHandleResultUpdate } from './search-result.hooks';

export const SearchResult = () => {
  const { result } = useHandleResultUpdate();
  return (
    <ul>
      {result.map((item, index) => (
        <li key={index}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  );
};
