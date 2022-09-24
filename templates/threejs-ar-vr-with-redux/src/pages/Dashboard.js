import React from 'react';
import { Header, Footer } from 'components'
import JSMOrbitControls from 'components/scenes/JSMOrbitControls'
import styled from "styled-components";

const Dashboard = () => {
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                   <JSMOrbitControls/>
                </Container>
            </ScrollView>
            <Footer/>
        </>
    )
}

export default Dashboard

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
`;