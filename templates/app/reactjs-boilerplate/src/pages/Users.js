import React, { useEffect, useState } from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    useGetUsersQuery,
} from '../services/UserServices';
import { api } from '../services/api';
import ReactPaginate from 'react-paginate';

const Users = () => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const { data, isFetching } = useGetUsersQuery(page);
    console.log('data', page);
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
                    {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                            {data?.data?.docs.map((item, index) => {
                                return <div key={index} onClick={() => navigate(`/users/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
                                    <p><b>Name:</b> {item.name}</p>
                                    <p><b>Email:</b> {item.email}</p>
                                </div>;
                            })}
                            <div style={{ margin: '0 auto', width: '500px' }}>
                                <ReactPaginate
                                    initialPage={page}
                                    onPageChange={(page) => setPage(page.selected)}
                                    pageRangeDisplayed={5}
                                    pageCount={data?.data?.totalPages}
                                    activeClassName="active"
                                />
                            </div>
                        </>
                    }
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default Users;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    padding-top: 50px;
`;
