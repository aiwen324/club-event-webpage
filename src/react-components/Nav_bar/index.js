import React from 'react';
import "./style.css";


class Navbar extends React.Component {
    render() {
        return (
            <div id="Navigation-bar">
                <div id="accountInfo">
                    <a href='login/'>Login</a>
                </div>
                <ul>
                    <li><a>Home</a></li>
                    <li><a>Announcements</a></li>
                    <li><a>Events</a></li>
                    <li><a>About us</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;