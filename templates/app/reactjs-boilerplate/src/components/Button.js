import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <BTN
            className={props.className}
            type={props.type}
            disabled={props.disabled}
        >
            {props.children}
        </BTN>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.string,
};

export default memo(Button);

const BTN = styled.button`
    width: 100%;
    padding: 10px;
    cursor: pointer;
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
