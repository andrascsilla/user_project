import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Outside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 25px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 80%;
  max-width: 1200px;
  background: #fff;
  border-radius: 10px;
`;

const TitleWrapper = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  * {
    margin: 0;
  }
`;

const ModalTitle = styled.p`
  flex: 1 1;
  font-weight: 300;
  margin-bottom: 8px;
`;

const ContentWrapper = styled.div`
  padding: 15px;
  overflow: auto;
`;

function Modal({ isOpen, title, content, onClose = () => {}, closeButtonText, ...props }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Outside role="dialog" onClick={onClose} {...props}>
      <Wrapper onClick={e => e.stopPropagation()}>
        <TitleWrapper>{title && <ModalTitle>{title}</ModalTitle>}</TitleWrapper>
        <ContentWrapper>{content}</ContentWrapper>
      </Wrapper>
    </Outside>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func,
  closeButtonText: PropTypes.string,
};

export default Modal;
