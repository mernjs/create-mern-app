import React, { Component } from 'react';
import { Content, Row, Box, Col } from 'adminlte-2-react';

class Dashboard extends Component {
    render() {
        return (
            <Content title="Dashbaord">
                <Row>
                    <Col xs={12}>
                        <Box title="Dashbaord">
                            <h1>Dashbaord</h1>
                        </Box>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default Dashboard;