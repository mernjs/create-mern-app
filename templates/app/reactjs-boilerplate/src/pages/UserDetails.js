import React from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {
    useGetUserQuery,
} from '../services/UserServices';

const UserDetails = () => {
    const { userId } = useParams();

    const { data, isFetching } = useGetUserQuery(userId);

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>User Details</H2>
                    <Link to="/users">Go Back</Link>
                    {isFetching ? <p>Loading...</p> :
                        <div>
                            <p><b>Name:</b> {data?.data?.name}</p>
                            <p><b>Email:</b> {data?.data?.email}</p>
                        </div>
                    }
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default UserDetails;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;
