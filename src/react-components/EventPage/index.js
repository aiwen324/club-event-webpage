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
                <div id='event_detail'>
                    <h3 id='event_time'>Date and Time: <p>Friday, February 28, 2020 @ 14:40</p></h3>
                    <h3 id='event_loc'>Location: <p>Myhal Centre, Rm. 317</p></h3>
                </div>
            </div>
        )
    }
}

export default EventPage
