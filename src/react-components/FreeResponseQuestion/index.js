import React from "react";
import TextField from "@material-ui/core/TextField";

import "./style.css";

class FreeResponseQuestion extends React.Component {
  render() {
    const { question } = this.props;
    let title = "Do you have anything else to tell us?";
    if (question) {
      title = question.questionTitle;
    }
    return (
      <div>
        <div className="survey_question">{title}</div>
        <div className="response_field">
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
    );
  }
}

export default FreeResponseQuestion;
