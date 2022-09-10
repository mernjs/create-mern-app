import React, { useEffect } from 'react';
import { Content, Row, Box, SimpleTable, Col } from 'adminlte-2-react';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';

const columns = [
    { title: 'ID', data: '_id', },
    { title: 'Name', data: 'name' },
    { title: 'Email', data: 'email' },
    { title: 'Date', data: 'createdAt'},
]

const Users = () => {
   
    const { getUsers } = useAuth()
    const users = useSelector(state => state.auth.users)
   
    useEffect(() => {
        getUsers()
    }, [])
   

    return (
        <Content title="Users">
            <Row>
                <Col xs={12}>
                    <Box title="Users">
                        <SimpleTable
                            striped
                            columns={columns}
                            data={users || []}
                        />
                    </Box>
                </Col>
            </Row>
        </Content>
    )
}

export default Users;