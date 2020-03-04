import React from 'react'
import DashboardSidebar from '../DashboardSidebar'
import Posts from '../Posts'
import DashboardAddButtons from '../DashboardAddButtons'
import Surveys from '../Surveys/index.js'

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

import './style.css'

class AdminDashboard extends React.Component {
    state = {
        greeting: null,
    }
    
    admain_status = 1;

    componentDidMount() {
        // Remove navbar
        const nav_bar = document.getElementById('Navigation-bar')
        if (nav_bar != null) {
            nav_bar.parentNode.removeChild(nav_bar)
        }

        // Get greetings according to time of the day
        const date = new Date()
        const hour = date.getHours()
        let greeting = null
        if (hour < 12) {
            greeting = 'Good morning'
        } else if (hour >= 18) {
            greeting = 'Good evening'
        } else {
            greeting = 'Good afternoon'
        }
        this.setState({ greeting })

    }

    render() {
        const { greeting } = this.state
        return (
            <div id='admin_dashboard'>
                <div id='sidebar'>
                    <DashboardSidebar/>
                </div>
                <div>
                    <img id='background_image' src={require("./images/shoko.png")}/>
                </div>
                <h3 id='admin_greet'>{greeting}, Admin!</h3>
                <div id='add_buttons'>
                    <DashboardAddButtons/>
                </div>
                <div id='posts'>

                    <Link underline='none' component={RouterLink} to="/adminEventPage">
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to='/AdminSurveyPage'>
                        <Surveys/>
                    </Link>

                    <Link underline='none' component={RouterLink} to="/adminEventPage">
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to='/adminEventPage'>
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to="/adminEventPage">
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to='/AdminSurveyPage'>
                        <Surveys/>
                    </Link>

                    <Link underline='none' component={RouterLink} to="/adminEventPage">
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to='/AdminSurveyPage'>
                        <Surveys/>
                    </Link>
                    
                </div>
            </div>
            
        )
    }

}

export default AdminDashboard
