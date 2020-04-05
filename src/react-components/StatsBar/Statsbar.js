import React from "react";
import "./statsbar.css";

class Statsbar extends React.Component {
  changeLength() {
    const { optionObj } = this.props;
    const element = document.getElementById("NotTobe");
    if (isNaN(optionObj.optionSelectedCount / optionObj.totalnum)) {
      element.style.width = 0 + "%";
    } else {
      console.log("Here is the current status of optionObj");
      console.log(
        `optionSelectedCount: ${optionObj.optionSelectedCount} optionObj.totalnum: ${optionObj.totalnum}`
      );
      element.style.width =
        Math.round((optionObj.optionSelectedCount / optionObj.totalnum) * 100) +
        "%";
      console.log(`element.style.width is: ${element.style.width}`);
    }
  }

  componentDidMount = () => {
    this.changeLength();
  };
  render() {
    const { optionObj } = this.props;
    return (
      <div className="container">
        <div id="NotTobe">
          {" "}
          {optionObj.optionContent}:{" "}
          {Math.round(
            (optionObj.optionSelectedCount / optionObj.totalnum) * 100
          )}
          %
        </div>
        <br />
      </div>
    );
  }
}

export default Statsbar;
