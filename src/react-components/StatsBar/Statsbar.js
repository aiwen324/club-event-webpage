import React from "react";
import "./statsbar.css";

class Statsbar extends React.Component {
  changeLength() {
    const { optionObj } = this.props;
    const element = document.getElementById("NotTobe");
    console.log("=============");
    console.log(optionObj.optionSelectedCount);
    console.log("=============");
    console.log(optionObj);
    if (isNaN(optionObj.optionSelectedCount / optionObj.totalnum)) {
      element.style.width = 0 + "%";
    } else {
      element.style.width =
        Math.round((optionObj.optionSelectedCount / optionObj.totalnum) * 100) +
        "%";
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
