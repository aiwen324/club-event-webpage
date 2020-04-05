import React from "react";
import "./SurveyStats.css";
import Statsbar from "../StatsBar/Statsbar.js";
import { uid } from "react-uid";

class SurveyStats extends React.Component {
  constructor(props) {
    super(props);
    this.admin = props.fromDashboard;
  }

  passTotalNum() {
    const { questionObj } = this.props;

    questionObj.options.map((option) => {
      option.totalnum = questionObj.totalnum;
      return option;
    });
  }
  componentWillMount = () => {
    this.passTotalNum();
  };
  render() {
    const { questionObj } = this.props;
    return (
      <div className="SurveyResult">
        <div className="survey_question">
          <div id="survey_question">{questionObj.question}</div>
          {questionObj.options.map((option) => (
            <Statsbar optionObj={option} key={uid(option)} />
          ))}
        </div>
      </div>
    );
  }
}

export default SurveyStats;
