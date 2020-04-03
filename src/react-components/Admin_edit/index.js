import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./style.css";
import Survey from "./survey";
import {
  parseQuestions,
  generateAnnouncement,
  uploadImages
} from "../../actions/admin";

class AdminEdit extends React.Component {
  textType = 0;
  checkBoxType = 1;

  state = {
    title: "",
    text_content: "",
    images: [],
    reg_field: false,
    survey: true,
    question_type: 1, // 1: Checkbox; 2: Textfield
    question_array: [
      { type: this.checkBoxType, options: "", questionTitle: "" }
    ]
  };

  addQuestion = e => {
    e.preventDefault();
    const question_array = this.state.question_array;
    const new_question = {
      type: this.checkBoxType,
      options: "",
      questionTitle: ""
    };
    question_array.push(new_question);
    this.setState({ question_array: question_array });
  };

  // Handle Checkbox for Register Field and Survey
  handleCheckBox = name => {
    return event => {
      this.setState({ [name]: event.target.checked });
    };
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleImageSelection = e => {
    const files = Array.from(e.target.files);
    console.log("Getting files: ", files);
    const newFiles = files.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    this.setState({ images: newFiles });
  };

  publishAnnouncement = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.text_content) {
      // TODO: Set error
      console.log("Implement required field");
      return;
    }

    // Try to upload images if images array is not empty
    if (this.state.images.length > 0) {
      uploadImages(this);
    }

    /* TODO: for each survey questions, check if it's valid:
        1. Check if quesiton is not empty
        1. If type is Checkboxes, check if the options is empty 
    */
    // TODO: Parse the options content if it is not empty
    let surveyQuestions;
    try {
      surveyQuestions = parseQuestions(this.state.question_array);
    } catch (error) {
      if (error.message === "Invalid Input") {
        // TODO: Fix the error
        console.log("Implement error alert");
        return;
      } else {
        throw Error;
      }
    }
    generateAnnouncement(this, surveyQuestions);
  };

  render() {
    const { reg_field, survey } = this.state;

    // const { classes } = this.props;
    return (
      <div className="Edit_panel">
        <form className="edit_form">
          <TextField
            id="title"
            className="input_field"
            label="Title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
            fullWidth
          />
          <TextField
            id="text_content"
            className="input_field"
            label="Announcement Description"
            placeholder="Enter the description"
            value={this.state.text_content}
            onChange={this.handleInputChange}
            multiline
            rows="5"
            fullWidth
            variant="outlined"
          />
          <input
            accept="image/*"
            className="input"
            id="contained-button-file"
            onChange={this.handleImageSelection}
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Images
            </Button>
          </label>
          <div className="img-panel">
            {this.state.images.map(image => {
              return <img src={image.preview} alt="Fail" />;
            })}
          </div>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={this.publishAnnouncement}
          >
            Post Announcement
          </Button>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={reg_field}
                  onChange={this.handleCheckBox("reg_field")}
                  value="reg_field"
                />
              }
              label="Add Registration Field"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={survey}
                  onChange={this.handleCheckBox("survey")}
                  value="survey"
                />
              }
              label="Add Survey"
            />
          </FormGroup>
          {this.state.survey ? (
            <div>
              {this.state.question_array.map((question, index) => (
                <Survey
                  question={question}
                  editPanel={this}
                  index={index}
                  key={index}
                />
              ))}
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={this.addQuestion}
              >
                Add Question
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  }
}

export default AdminEdit;
