import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/ClearOutlined'
import IconButton from '@material-ui/core/IconButton';

import './style.css'

class DashboardSidebar extends React.Component {
    render() {
        return (
            <div id='sidebar'>
                <ul>
                    <li>
                        <IconButton onClick={() => {
                            this.props.app.setState({ navBarHidden: false })
                            this.props.history.push('/')
                        }}>
                            <HomeIcon
                                style={{ color: 'white' }}
                                fontSize='large'
                            />
                            <div>Home</div>
                        </IconButton>
                    </li>
                </ul>
                <div id='signout' onClick={() => { this.props.history.push('/') }}>
                    <div id='signout-button-content'>
                        <CloseIcon
                            style={{ color: 'white' }}
                            fontSize='large'
                        />
                        <a href='/login'>Sign Out</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardSidebar