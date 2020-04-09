import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { configure, addParameters } from '@storybook/react';
import { isEmpty } from 'ramda';

addParameters({
  options: {
    showRoots: true,
  },
});

configure(
  [
    createStoryGroup(require.context('../src/shared/components', true, /\.story\.js$/), 'Components'),
    // createStoryGroup(require.context('../src/shared/templates', true, /\.story\.js$/), 'Templates'),
  ],
  module
);

function createStoryGroup(collection, prefix) {
  collection.keys().forEach(key => {
    const item = collection(key);

    if (isEmpty(item) || !item) {
      throw new Error(`You are probably not exporting a story correctly for component: ${key}`);
    }

    item.default.title = `${prefix}/${item.default.title}`;
  });

  return collection;
}
