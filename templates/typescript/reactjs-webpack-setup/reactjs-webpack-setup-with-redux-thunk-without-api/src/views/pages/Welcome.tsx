import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'
import { WelcomeStates } from '../../types/WelcomeTypes';

class WelcomePage extends Component<any, WelcomeStates> {

    componentDidMount(){
        this.props.dispatch(WelcomeActions.setUser({name: 'MernJs', id: 22}))
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
                            MernJs
                        </div>

                        <div className="links">
                            <a target="_blank" rel="noopener noreferrer" href="http://mernjs.org">Website</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://mernjs.org/installation">Docs</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://mernjs-code-snippets.herokuapp.com">Code Snippets</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCAcmuHoa3sEN_KuwFYk6xMw/playlists">Youtube</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/mernjs/create-mernjs-app">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)