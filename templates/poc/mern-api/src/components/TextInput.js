import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';

const Input = (props) => {
    const { field, label, type, placeholder, errors } = props;
    return (
        <TextInput>
            {label && <label>{label}</label>}
            <input
                placeholder={placeholder}
                className="text-input"
                type={type}
                {...field}
            />
            {errors && (
                <ErrorMessage
                    errors={errors}
                    name={field.name}
                    render={({ message }) => (
                        <span style={{ color: 'red' }}>{message}</span>
                    )}
                />
            )}
        </TextInput>
    );
};

Input.propTypes = {
    name: PropTypes.string,
    field: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
};

export default Input;

const TextInput = styled.div`
    margin-bottom: 16px;
    .text-input {
        padding: 22px 15px;
        height: 40px;
        width: 100%;
        border: 1px solid rgb(238, 236, 236);
        border-radius: 28px;
        background-color: rgb(255, 255, 255);
        color: rgb(33, 33, 33);
        font-size: 14px;
        letter-spacing: 0px;
        line-height: 28px;
        background-clip: padding-box;
        font-weight: 400;
        display: block;
        &::placeholder {
            color: #b9b8b8;
            opacity: 1;
        }
    }
    .error_show {
        font-size: 12px;
        color: #d92020;
    }
`;
