import React from 'react';
import SearchField from './index';

export default {
  title: 'SearchField',
};

export const DefaultView = () => (
  <SearchField
    labelText="Search:"
    placeholder="Type a film title here..."
    buttonText="Search"
    onSubmit={value => console.log(value)}
  />
);
