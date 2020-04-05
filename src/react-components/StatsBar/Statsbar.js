import React from "react";
import "./statsbar.css";

class Statsbar extends React.Component {
  state = {
    width: "0%"
  };
  changeLength() {
    const { optionObj } = this.props;
    if (isNaN(optionObj.optionSelectedCount / optionObj.totalnum)) {
      return;
    } else if (optionObj.optionSelectedCount === 0) {
      this.setState({ width: "5%" });
    } else {
      const width =
        Math.round((optionObj.optionSelectedCount / optionObj.totalnum) * 100) +
        "%";
      this.setState({ width });
    }
  }

  componentDidMount = () => {
    this.changeLength();
  };
  render() {
    const { optionObj } = this.props;
    return (
      <div className="container">
        <div
          id="NotTobe"
          style={{
            width: this.state.width,
            backgroundColor: "(#808080e7, 0.604)"
          }}
        >
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
