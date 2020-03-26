import React from 'react';
import Link from 'react-router';
import "./style.css";



class Navbar extends React.Component {


    render() {
        const { user, navBarHidden } = this.props

        let name = ""
        if (!user) {
            name = "Sign in"
        } else {
            name = user.username
        }

        return (
            <div id="Navigation-bar" style={navBarHidden ? { display: 'none' } : {}}>
                <div id="accountInfo">
                    <a href='/login'>{name}</a>
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='#posts'>Announcements</a></li>
                </ul>
            </div >
        )
    }
}

export default Navbar;