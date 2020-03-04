import React from 'react';
import "./style.css";


class Navbar extends React.Component {
    render() {
        return (
            <div id="Navigation-bar">
                <div id="accountInfo">
                    <a href='/login'>Sign in</a>
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='#posts'>Announcements</a></li>
                    <li><a href='#posts'>Events</a></li>
                    <li><a>About us</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;