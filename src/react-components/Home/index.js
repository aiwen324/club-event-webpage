import React from 'react';

import './style.css';
// import bgImage from './images/home-books.jpg';

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
                {/* <div className="center" id="Backgorund-img">
                </div> */}
                <div id="Welcome-section">
                    <h1 id="Welcome">Welcome to UTACG survey center</h1>
                    <p>Your opinion is valuable to us</p>
                </div>
                
                <div id="event-forms">
                    <p>hahahh</p>
                </div>
                <img className='center' id='Backgorund-img' alt='Error'/>
            </div>
        )
    }
}

export default Home;