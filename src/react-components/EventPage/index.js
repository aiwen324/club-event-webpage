import React from 'react';

import './style.css';
// import Posts from '../Posts' 
// import { Link as RouterLink } from 'react-router-dom';
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
            </div>
        )
    }
}

export default EventPage
