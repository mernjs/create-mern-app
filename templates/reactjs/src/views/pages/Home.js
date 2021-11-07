import React from 'react';
import { Header, Footer } from 'views/components'
import styled from "styled-components";

const Home = () => {
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <h1>Home</h1>
                </Container>
            </ScrollView>
            <Footer/>
        </>
    )
}

export default Home

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;