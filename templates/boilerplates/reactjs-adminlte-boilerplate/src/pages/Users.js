import React from 'react';
import { Content, Row, Box, SimpleTable, Col } from 'adminlte-2-react';

const columns = [
  { title: 'ID', data: '_id' },
  { title: 'Name', data: 'name' },
  { title: 'Email', data: 'email' }
];

const Users = () => {
  const users = [
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    },
    {
      _id: '12345',
      name: 'Vijay',
      email: 'vijay@getnada.com'
    }
  ];

  return (
    <Content title="Users">
      <Row>
        <Col xs={12}>
          <Box title="Users">
            <SimpleTable striped columns={columns} data={users || []} />
          </Box>
        </Col>
      </Row>
    </Content>
  );
};

export default Users;
