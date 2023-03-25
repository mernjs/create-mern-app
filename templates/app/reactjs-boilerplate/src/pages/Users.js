import React, { useEffect } from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    useGetUsersQuery,
} from '../services/UserServices';
import { api } from '../services/api';

const UserDetails = () => {
    const navigate = useNavigate();

    const { data, isFetching } = useGetUsersQuery();

    // const getUsers = () => {
    // 	dispatch(api.endpoints.getUsers.initiate());
    // };

    // useEffect(() => {
    // 	getUsers();
    // }, []);

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Users</H2>
                    {isFetching ? <p>Loading...</p> :
                        <>
                            {data?.data?.docs.map((item, index) => {
                                return <div key={index} onClick={() => navigate(`/users/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
                                    <p><b>Name:</b> {item.name}</p>
                                    <p><b>Email:</b> {item.email}</p>
                                </div>;
                            })}
                        </>
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
