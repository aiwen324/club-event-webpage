import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import './style.css';

class SurveyQuestion extends React.Component {
    render() { 
        // const [checked, setChecked] = React.useState(true);

        // const handleChange = event => {
        //     setChecked(event.target.checked);
        // };

        return (
            <div className="survey_question">
                <div id='survey_question'>
                    That is the question. 
                </div>
                <div className='choice'>
                    <Checkbox
                        // onChange={handleChange}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />To be. 
                </div>
                <div className='choice'>
                    <Checkbox
                        // onChange={handleChange}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />Not to be. 
                </div>
            </div>
        )
    }
}

export default SurveyQuestion
