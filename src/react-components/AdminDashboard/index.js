import React from 'react'

import './style.css'

class AdminDashboard extends React.Component {
    componentDidMount() {
        const nav_bar = document.getElementById('Navigation-bar')
        if (nav_bar != null) {
            nav_bar.parentNode.removeChild(nav_bar)
        }
    }

    render() {
        return (
            <div id='admin_dashboard'>
                
            </div>
        )
    }

}

export default AdminDashboard
