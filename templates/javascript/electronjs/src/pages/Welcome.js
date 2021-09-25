import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../actions/WelcomeActions'


class WelcomePage extends Component {

    test = () => {
        this.props.dispatch(WelcomeActions.test({name: 'ElectronJs'}))
    }

    render() { 
        return (
            <div className="flex-center position-ref full-height">
                <div className="content">
                    <div onClick={this.test} className="title m-b-md">
                        ElectronJs
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)