import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as WelcomeActions from '../../actions/WelcomeActions'

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
                            <a target="_blank" without rel="noopener noreferrer" href="http://mernjs.org">Website</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://mernjs.org/installation">Docs</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://mernjs.org/sample-apps">Sample Apps</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://www.youtube.com/channel/UCAcmuHoa3sEN_KuwFYk6xMw/playlists">Youtube</a>
                            <a target="_blank" without rel="noopener noreferrer" href="https://github.com/mernjs/create-mernjs-app">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(WelcomePage)