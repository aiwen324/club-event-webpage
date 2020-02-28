import React from 'react';

import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import Event_register from '../Event_register'
// import Link from '@material-ui/core/Link'

class EventPage extends React.Component {
    render() {
        return (
            <div className="event_page">
                <div>
                    <h1 id='event_title'>Project Demo</h1>
                </div>
                <div id='event_info'>
                    <h3 id='event_time'>Date and Time: <h>Friday, February 28, 2020 @ 14:40</h></h3>
                    <h3 id='event_loc'>Location: <h>Myhal Centre, Rm. 317</h></h3>
                </div>
                <div id='event_details'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                        est laborum.
                    </p>
                </div>
                <div>
                    <img class="event_image" src={require("./images/boeing777x.jpeg")}/>
                </div>
                <div>
                    <img class="event_image" src={require("./images/shoko-enoshima.jpeg")}/>
                </div>
                <Event_register />
            </div>
        )
    }
}

export default EventPage
