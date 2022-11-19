import React from 'react';
import styled from 'styled-components';

export default (props) => {
  return (
    <Button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  border-radius: 25px;
  background-color: ${(props) => (props.disabled ? 'gray' : '#4c84ff')};
  border: none;
  margin-bottom: 16px;
`;
