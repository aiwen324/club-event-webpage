import React from "react";
import "./SurveyStats.css";

class SurveyStats extends React.Component {
  render() {
    const { options } = this.props;
    return (
      <div className="SurveyResult">
        <div className="survey_question">
          <div id="survey_question">{options.question}</div>

          <div className="container">
            <div className="skills tobe"> To be: 65%</div>
            <br />
          </div>

          <div className="container">
            <div className="skills NotTobe"> Not to be: 60%</div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyStats;
