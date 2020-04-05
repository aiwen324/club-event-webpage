import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

import "./style.css";

class SurveyQuestion extends React.Component {
  handleClick = (e, opt_id) => {
    const { eventComp, question } = this.props;
    const { questionMap } = eventComp.state;
    questionMap[question._id][opt_id] = e.target.checked;
    eventComp.setState({ questionMap });
  };

  render() {
    const { question, eventComp } = this.props;
    let title = "This is the question";
    let options = [
      {
        optionSelectedCount: 0,
        _id: "11111",
        optionContent: "To be",
      },
      {
        optionSelectedCount: 0,
        _id: "22222",
        optionContent: "Not to be",
      },
    ];
    if (question) {
      title = question.questionTitle;
      options = question.questionOptions;
    }
    return (
      <div className="survey_question">
        <div id="survey_question">{title}</div>
        {options.map((option) => (
          <div className="choice">
            <Checkbox
              checked={eventComp.state.questionMap[question._id][option._id]}
              onClick={(e) => this.handleClick(e, option._id)}
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {option.optionContent}
          </div>
        ))}
      </div>
    );
  }
}

export default SurveyQuestion;
