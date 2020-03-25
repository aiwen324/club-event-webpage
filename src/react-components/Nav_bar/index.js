import React from 'react';
import "./style.css";


class Navbar extends React.Component {
    render() {
        const { displayName } = this.props

        let name = ""
        if (displayName === "") {
            name = "Sign in"
        } else {
            name = displayName
        }

        return (
            <div id="Navigation-bar">
                <div id="accountInfo">
                    <a href='/login'>{name}</a>
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='#posts'>Announcements</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;