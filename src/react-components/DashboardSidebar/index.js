import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/ClearOutlined'

import './style.css'

class DashboardSidebar extends React.Component {
    render() {
        return (
            <div id='sidebar'>
                <ul>
                    <li>
                        <div className='button_padding'/>
                        <HomeIcon
                            style={{ color: 'white' }}
                            fontSize='large'
                        />
                        <a href='/'>Home</a>
                        <div className='button_padding'/>
                    </li>
                    <li>
                        <div className='button_padding'/>
                        <PersonIcon
                            style={{ color: 'white' }}
                            fontSize='large'
                        />
                        <a href='/'>Account</a>
                        <div className='button_padding'/>
                    </li>
                    <li>
                        <div className='button_padding'/>
                        <SettingsIcon
                            style={{ color: 'white' }}
                            fontSize='large'
                        />
                        <a href='/'>Settings</a>
                        <div className='button_padding'/>
                    </li>
                </ul>
                <div id='signout'>
                    <div className='button_padding'/>
                    <CloseIcon
                        style={{ color: 'white' }}
                        fontSize='large'
                    />
                    <a href='/'>Sign Out</a>
                    <div className='button_padding'/>
                </div>
            </div>
        )
    }
}

export default DashboardSidebar