import React from 'react';
import styled from "styled-components/native";
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { H2 } from '../components'
import { useDispatch } from 'react-redux'
import { CoreActions } from '../reducers/CoreReducer'
import { showToast } from '../utils/Utilities'

const Dashboard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    
    const switchTheme = async (payload) => {
        dispatch(CoreActions.switchTheme(payload))
        showToast('Theme Switch Successfully!', 'success')
    }
    
    return (
        <ScrollView>
            <Container>
                <H2 onPress={() => navigation.push('Login')}>Dashboard</H2>
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