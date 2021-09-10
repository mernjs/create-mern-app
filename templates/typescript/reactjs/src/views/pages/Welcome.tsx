import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'
import { WelcomeStates } from '../../types/WelcomeTypes';

class WelcomePage extends Component<any, WelcomeStates> {

    componentDidMount(){
        this.props.dispatch(WelcomeActions.setUser({name: 'ReactJs', id: 22}))
    }

    test = () => {
        this.props.dispatch(WelcomeActions.resetUser({}))
    }
    
    render() { 
        return (
            <div>
                 <div className="flex-center position-ref full-height">
            
                    <div className="content">
                        <div onClick={this.test} className="title m-b-md">
                            ReactJs
                        </div>

                        <div className="links">
                            <a target="_blank" rel="noopener noreferrer" href="https://mernjs.github.io/create-mernjs-app">Website</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://mernjs.github.io/create-mernjs-app/installation">Docs</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/mernjs/create-mernjs-app">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)