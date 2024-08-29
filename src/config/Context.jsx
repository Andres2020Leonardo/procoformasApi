import React, { useContext } from 'react';
import MyContext from './MyContext';

function MyComponent() {
  const { basename } = useContext(MyContext);

  return <div>{basename}</div>;
}