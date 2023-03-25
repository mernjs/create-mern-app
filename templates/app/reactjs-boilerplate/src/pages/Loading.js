import React from 'react';
import styled from 'styled-components';

const Loading = () => {
    return (
        <ScrollView>
            <Container>
                <h1>Loading...</h1>
            </Container>
        </ScrollView>
    );
};

export default Loading;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 200px;
`;
