import React from "react";
import styled from "styled-components";

export default (props) => {
    return (
        <Footer>
            <div className="container">
                <div className="row">
                    <p style={{marginLeft: '30px', marginRight: '30px'}}><span style={{textAlign: 'left', lineHeight: '60px'}}>©2021 MERN Micro Framework</span><span style={{float: 'right', lineHeight: '60px'}}><b>Developed by:</b> Vijay Pratap Singh</span></p>
                </div>
            </div>
        </Footer>
    );
}

const Footer = styled.footer`
    background-color: #fff;
    width: 100%;
`;