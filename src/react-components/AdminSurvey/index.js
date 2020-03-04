import React from 'react';

import './style.css';
import SurveyQuestion from "../SurveyQuestion"
import FreeResponseQuestion from "../FreeResponseQuestion"

import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core'
import SurveyStats from "../SurveyStats/SurveyStats.js"
import FreeResponseResult from "../FreeResponseResult/Comment.js"

// import Link from '@material-ui/core/Link'

class AdminSurveyPage extends React.Component {
    render() {
        return (
            <div id='survey_page_contents'>
                <div className="survey_page">
                    <div>
                        <h1 id='survey_title'>Which anime are you watching this season?</h1>
                    </div>
                    <div id='survey_details'>
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
                        <img className="survey_image" src={require("./images/ao-manaka-1.jpeg")}/>
                    </div>
                    <div>
                        <img className="survey_image" src={require("./images/ao-manaka-2.jpeg")}/>
                    </div>
                    {/* <div id='survey_form'>
                        <SurveyQuestion/>
                    </div> */}
                    
                    <div id='SurveyPart'>
                        
                        <div>
                            <h2 className='event_section_title'>Pre-event Survey</h2>
                        </div>
                        <div className='surveyResult'>
                            <SurveyStats/>
                            <SurveyStats/>
                            <SurveyStats/> 
                        </div> 
                        <FreeResponseResult/>
                        <div className='bottom_padder'/>
                    </div>
                    <div className='bottom_padder'/>
                </div>
                <div className='bottom_padder'/>
            </div>
            
        )
    }
}

export default AdminSurveyPage
