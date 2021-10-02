import React from 'react';
import Header from 'components/Header'
import Footer from 'components/Footer'
import styled from "styled-components";
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <h1>Dashboard</h1>
                    <p><b>Name</b>: {user.name}</p>
                    <p><b>Email</b>: {user.email}</p>
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
    padding-top: 50px;
    h1, p{
        color: ${props => props.theme.colors.textColor};
    }
`;
