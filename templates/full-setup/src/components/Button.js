import React from "react";
import styled from "styled-components";

export default (props) => {
    return (
        <Button className={props.className} type={props.type}>
            {props.children}
        </Button>      
    )
}

const Button = styled.button`
    width: 100%;
    padding: 10px;
    cursor: pointer;
    color: ${props => props.theme.colors.buttonTextColor};
    font-size: 18px;
    letter-spacing: .5px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    border-radius:25px;
    background-color:${props => props.theme.colors.primaryColor};
    border:none;
    margin-bottom: 16px;
`;

