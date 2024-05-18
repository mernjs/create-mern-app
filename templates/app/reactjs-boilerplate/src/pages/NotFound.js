import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <h1>404 - Page Not Found</h1>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default NotFound;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;
