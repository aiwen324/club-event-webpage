import React from "react";
import "./style.css";

class Posts extends React.Component {
  render() {
    const { title, paragraph } = this.props;

    const hardcoded = !(title && paragraph);
    return (
      <div>
        {hardcoded ? (
          <div className="post">
            <h3>Event 1</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
            tristique libero, sit amet tempus ex. In egestas enim felis, vel
            dapibus dolor malesuada vitae. Praesent convallis massa lectus, at
          </div>
        ) : (
          <div className="post">
            <h3>{title}</h3>
            <p>{paragraph}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
