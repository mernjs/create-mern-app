import React from 'react';
import styled from "styled-components/native";
import { Text } from 'react-native'
import { H2 } from 'app/views/components'
import useCore from 'app/hooks/useCore'

const Dashboard = () => {
    let { switchTheme } = useCore()
    return (
        <ScrollView>
            <Container>
                <H2 onPress={switchTheme}>Dashboard</H2>
                <Text onPress={switchTheme}>Welcome React Native</Text>
            </Container>
        </ScrollView>
    )
}

export default Dashboard

const ScrollView = styled.ScrollView`
    padding: 20px;
    background: ${({theme}) => theme.colors.bgColor};
`;

const Container = styled.View`
    padding-top: 50px;
`;