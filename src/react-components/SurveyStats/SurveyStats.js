import React from 'react';
import './SurveyStats.css';

class SurveyStats extends React.Component {
	render() {
		return (
			<div className="SurveyResult">
				<div className="survey_question">
					<div id='survey_question'>
						That is the question. 
					</div>

					<div class="container">
						<div class="skills tobe"> To be: 65%</div>
						<br/>
					</div>

					<div class="container">
						<div class="skills NotTobe"> Not to be: 60%</div>
						<br/>
					</div>
				</div>
			</div>
		)
	}

}

export default SurveyStats