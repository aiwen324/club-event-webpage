import React from 'react';

import './style.css';
// import Posts from '../Posts' 
import { Link as RouterLink } from 'react-router-dom';
// import Link from '@material-ui/core/Link'

class EventPage extends React.Component {
    render() {
        return (
            <div className="event_page">
                <div id="Navigation-bar">
                    <div id="accountInfo">
                        <a>Login</a>
                    </div>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Announcements</a></li>
                        <li><a>Events</a></li>
                        <li><a>About us</a></li>
                    </ul>
                </div>
                <div>
                    <h1 id='event_title'>Project Demo</h1>
                </div>
                <div id='event_info'>
                    <h3 id='event_time'>Date and Time: <h>Friday, February 28, 2020 @ 14:40</h></h3>
                    <h3 id='event_loc'>Location: <h>Myhal Centre, Rm. 317</h></h3>
                </div>
                <div id='event_details'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                    est laborum.
                </div>
            </div>
        )
    }
}

export default EventPage
