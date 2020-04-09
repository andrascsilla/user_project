import React from 'react';
import Modal from './index';

export default {
  title: 'Modal',
};

export const DefaultView = () => (
  <Modal isOpen={true} title="Modal title" content="This is the content inside a modal" closeButtonText="Cancel" />
);
