import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

import "./style.css";

class SurveyQuestion extends React.Component {
  handleClick = (e, opt_idx) => {
    const { question } = this.props;
    question.questionOptions[opt_idx].optionSelectedCount += e.target.checked
      ? 1
      : -1;
  };
  render() {
    // const [checked, setChecked] = React.useState(true);

    // const handleChange = event => {
    //     setChecked(event.target.checked);
    // };

    const { question } = this.props;
    let title = "This is the question";
    let options = ["To be", "Not to be"];
    if (question) {
      title = question.questionTitle;
      options = question.questionOptions.map(
        (optionObject) => optionObject.optionContent
      );
    }
    console.log("Get options");
    console.log(options);
    return (
      <div className="survey_question">
        <div id="survey_question">{title}</div>
        {/* <div className="choice">
          <Checkbox
            // onChange={handleChange}
            value="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          To be.
        </div>
        <div className="choice">
          <Checkbox
            // onChange={handleChange}
            value="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          Not to be.
        </div> */}
        {options.map((option, opt_idx) => (
          <div className="choice">
            <Checkbox
              // onChange={handleChange}
              onClick={(e) => this.handleClick(e, opt_idx)}
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {option}
          </div>
        ))}
      </div>
    );
  }
}

export default SurveyQuestion;
