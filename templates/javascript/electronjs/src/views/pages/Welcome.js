import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'


class WelcomePage extends Component {

    test = () => {
        this.props.dispatch(WelcomeActions.test({name: 'ElectronJs'}))
    }

    render() { 
        return (
            <div>
                 <div className="flex-center position-ref full-height">
            
                    <div className="content">
                        <div onClick={this.test} className="title m-b-md">
                            ElectronJs
                        </div>

                        <div className="links">
                            <a target="_blank" without rel="noopener noreferrer" href="https://mernjs.github.io/create-mernjs-app">Website</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://mernjs.github.io/create-mernjs-app/installation">Docs</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://github.com/mernjs/create-mernjs-app">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)