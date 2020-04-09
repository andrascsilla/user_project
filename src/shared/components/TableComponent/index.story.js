import React from 'react';
import TableComponent from './index';

const header = [
  { id: '1', value: 'Name' },
  { id: '2', value: 'Image' },
  { id: '3', value: 'firstAired' },
  { id: '4', value: 'Network' },
  { id: '5', value: 'Overview' },
];

const rows = [
  {
    id: '1',
    name: 'Film1',
    image: 'film1.png',
    firstAired: 'first film1',
    network: 'film1 network',
    overview: 'film1 overview',
  },
  {
    id: '2',
    name: 'Film2',
    image: 'film2.png',
    firstAired: 'first film2',
    network: 'film2 network',
    overview: 'film2 overview',
  },
  {
    id: '3',
    name: 'Film3',
    image: 'film3.png',
    firstAired: 'first film3',
    network: 'film3 network',
    overview: 'film3 overview',
  },
];

export default {
  title: 'TableComponent',
};

export const DefaultView = () => <TableComponent header={header} rows={rows} onClick={() => console.log('xxxx')} />;
