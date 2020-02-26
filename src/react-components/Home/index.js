import React from 'react';

import './style.css';
import Posts from '../Posts' 
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

class Home extends React.Component {
    render() {
        return (
            <div className='home_pg'>
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
                <div id="Backgorund-img">
                    <div id="Welcome-section">
                        <h1 id="Welcome">Welcome to UTACG survey center</h1>
                        <p>Your opinion is valuable to us</p>
                    </div>
                </div>
                <div className='posts'>
                    <Link underline='none' component={RouterLink} to='/your-target-path'>
                        <Posts/>
                    </Link>
                    <Link underline='none' component={RouterLink} to='/your-target-path'>
                        <Posts/>
                    </Link>
                    <Link underline='none' component={RouterLink} to='/your-target-path'>
                        <Posts/>
                    </Link>
                    <Link underline='none' component={RouterLink} to='/your-target-path'>
                        <Posts/>
                    </Link>
                </div>
                {/* <div id='Backgorund-img'>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                    <div className="event-forms">
                        <p>hahahh</p>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Home;