import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import * as WelcomeActions from 'src/actions/WelcomeActions'

class Welcome extends Component {

    login = () => {
        this.props.dispatch(WelcomeActions.test({name: 'React Native'}))
    }

    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.login}>React Native</Text>
            </View>
        )
    }
}

export default connect(null)(Welcome)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
})
