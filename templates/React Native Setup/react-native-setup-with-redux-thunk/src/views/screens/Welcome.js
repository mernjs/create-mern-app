import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import * as WelcomeActions from 'src/actions/WelcomeActions'

class WelcomePage extends Component {

    login = () => {
        let values = {}
        values.email = "mernjscommunity"
        values.password = "mernjscommunity"
        this.props.dispatch(WelcomeActions.test(values))
    }

    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}  onPress={this.login}>Welcome to MernJs</Text>
                <Text style={styles.instructions}>Docs | Blog | Videos | GitHub</Text>
            </View>
        )
    }
}

export default connect(null)(WelcomePage)


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
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
