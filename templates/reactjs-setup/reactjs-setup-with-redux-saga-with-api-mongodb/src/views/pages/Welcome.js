import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'
import { Link } from 'react-router-dom'

class WelcomePage extends Component {

    test = () => {
        this.props.dispatch(WelcomeActions.test({name: 'MERN.JS'}))
    }

    render() { 
        return (
            <div>
                 <div className="flex-center position-ref full-height">
            
                    <div className="content">
                        <div onClick={this.test} className="title m-b-md">
                            MernJs
                        </div>
                        <div className="links">
                            <Link rel="noopener noreferrer" to="http://mernjs.org">Website</Link>
                            <Link rel="noopener noreferrer" to="https://mernjs.org/installation">Docs</Link>
                            <Link rel="noopener noreferrer" to="https://mernjs.org/showcase">Sample Apps</Link>
                            <Link rel="noopener noreferrer" to="https://github.com/mernjs/create-mernjs-app">GitHub</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)