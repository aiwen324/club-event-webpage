
import React from 'react'
import TextField from '@material-ui/core/TextField';

import './style.css'

class FreeResponseQuestion extends React.Component {
    render() {
        return (
            <div>
                <div className='survey_question'>
                    Do you have anything else to tell us? 
                </div>
                <div className='response_field'>
                <TextField
                        variant="outlined"
                        margin="normal"
                        id="response"
                        fullWidth
                        multiline
                        label="Your response"
                        />
                </div>
            </div>
        )
    }
}

export default FreeResponseQuestion
