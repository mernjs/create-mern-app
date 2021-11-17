import React from "react";
import styled from "styled-components";

export default (props) => {
    return (
        <Footer>
            <div className="container">
                <div className="row">
                    <p style={{textAlign: 'center', lineHeight: '60px'}}>©2021 MERN Micro Framework</p>
                </div>
            </div>
        </Footer>
    );
}

const Footer = styled.footer`
    background-color: #fff;
    width: 100%;
`;