import React from 'react';

import './style.css';
import Posts from '../Posts' 
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

class Home extends React.Component {
    render() {
        return (
            <div className='home_pg'>
                <div id="title-container">
                    <div id="Welcome-section">
                        <h1 id="Welcome">Welcome to UTACG survey center</h1>
                        <p>Your opinion is valuable to us</p>
                    </div>
                </div>
                <div className='posts' id='posts'>
                    <Link underline='none' component={RouterLink} to='/event'>
                        <Posts/>
                    </Link>

                    <Link underline='none' component={RouterLink} to='/survey'>
                        <Posts/>
                    </Link>
                    <Link underline='none' component={RouterLink} to='/postid=3'>
                        <Posts/>
                    </Link>
                    <Link underline='none' component={RouterLink} to='/your-target-path'>
                        <Posts/>
                    </Link>
                </div>
                <div id='bottom-padding'/>

            </div>
        )
    }
}

export default Home;