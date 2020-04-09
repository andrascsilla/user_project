import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  padding: 15px 0;
`;

const StyledButton = styled(Button)`
  border-color: #ff7733;
  background-color: #fff;
  color: #212529;
  font-size: 12px;
  text-transform: uppercase;
  &:hover {
    color: #ff7733;
    background-color: #ffede4;
  }
  &:focus,
  &:active {
    outline: none;
    border-color: #ff7733;
    color: #ff7733;
    background-color: #ffede4;
  }
`;

function AddButton({ text, ...props }) {
  return (
    <ButtonContainer>
      <StyledButton {...props}>{text}</StyledButton>
    </ButtonContainer>
  );
}

AddButton.propTypes = {
  text: PropTypes.string,
};

export default AddButton;
