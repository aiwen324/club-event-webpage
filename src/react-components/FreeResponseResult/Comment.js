import React from "react";
import "./style.css";
class FreeResponseResult extends React.Component {
  render() {
    const { response } = this.props;
    console.log("response in FreeResponseResult is: ");
    console.log(response);
    return (
      <div>
        <div className="survey_question">
          Do you have anything else to tell us?
        </div>
        <div className="ReseponseContainer">
          <div className="Reseponse">
            <p id="userId">Anonymous User</p>
            <p id="content">{response}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FreeResponseResult;
