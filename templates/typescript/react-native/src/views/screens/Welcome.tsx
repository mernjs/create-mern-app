import React, { Component } from 'react';
import {View, Text, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'
import { WelcomeStates } from '../../types/WelcomeTypes';

class WelcomePage extends Component<any, WelcomeStates> {

    componentDidMount(){
      this.props.dispatch(WelcomeActions.setUser({name: 'React Native', id: 22}))
    }

    test = () => {
        this.props.dispatch(WelcomeActions.resetUser({}))
    }

    onOpen = (url: string) => {
        Linking.openURL(url)
    }

    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}  onPress={this.test}>React Native</Text>
                <View style={styles.instructions}>
                    <Text onPress={()=> this.onOpen('https://mernjs.github.io/create-mernjs-app')} style={{marginRight: 10}}>Website</Text>
                    <Text onPress={()=> this.onOpen('https://mernjs.github.io/create-mernjs-app/installation')} style={{marginRight: 10}}>Docs</Text>
                    <Text onPress={()=> this.onOpen('https://github.com/mernjs/create-mernjs-app')} >GitHub</Text>
                </View>
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
    margin: 20,
  },
  instructions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
