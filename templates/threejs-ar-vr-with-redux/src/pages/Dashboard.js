import React from 'react';
import { Header, Footer } from 'components'
import styled from "styled-components";
import { useSelector } from 'react-redux'
import JSMOrbitControls from 'components/JSMOrbitControls'

const Dashboard = () => {
    const user = useSelector(state => state.auth.user)
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
