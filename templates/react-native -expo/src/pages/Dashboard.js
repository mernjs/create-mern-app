import React from 'react';
import styled from "styled-components/native";
import { Text } from 'react-native'
import { H2 } from '../components'
import useCore from '../hooks/useCore'
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    let { switchTheme } = useCore()
    const navigation = useNavigation();
    return (
        <ScrollView>
            <Container>
                <H2 onPress={() => navigation.push('Home')}>Dashboard</H2>
                <Text onPress={switchTheme}>Welcome Dashboard Page</Text>
            </Container>
        </ScrollView>
    )
}

export default Dashboard

const ScrollView = styled.ScrollView`
    padding: 20px;
`;

const Container = styled.View`
    padding-top: 50px;
`;