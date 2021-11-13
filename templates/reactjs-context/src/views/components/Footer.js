import React from "react";
import styled from "styled-components";

export default (props) => {
    return (
        <Footer>
            <div className="container">
                <div className="row">
                    <p style={{textAlign: 'center', lineHeight: '60px'}}>Powered By MERN Stack Boilerplate</p>
                </div>
            </div>
        </Footer>
    );
}

const Footer = styled.footer`
    background-color: #fff;
    width: 100%;
`;