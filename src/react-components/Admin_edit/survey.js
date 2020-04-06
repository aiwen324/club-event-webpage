import React from "react";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import "./survey.css";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.checkBoxType = 1;
    this.textType = 0;
  }

  removeQuestion = (editPanel, index, e) => {
    e.preventDefault();
    const question_array = editPanel.state.question_array;
    question_array.splice(index, 1);
    editPanel.setState({ question_array: question_array });
  };

  handleTypeSelection = (editPanel, index, event) => {
    event.preventDefault();
    const question_array = editPanel.state.question_array;
    question_array[index].type = event.target.value;
    if (event.target.value !== this.checkBoxType) {
      question_array[index].options = "";
    }
    editPanel.setState({ question_array: question_array });
  };

  handleTextInput = (editPanel, index, e) => {
    e.preventDefault();
    const question_array = editPanel.state.question_array;
    question_array[index][e.target.name] = e.target.value;
    editPanel.setState({ question_array: question_array });
  };

  render() {
    const { editPanel, index, question } = this.props;
    return (
      <div className="question_section">
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              name="questionTitle"
              className="question"
              label="Question"
              placeholder="Question"
              value={editPanel.state.question_array[index].questionTitle}
              onChange={e => this.handleTextInput(editPanel, index, e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <Select
                value={question.type}
                onChange={e => this.handleTypeSelection(editPanel, index, e)}
                displayEmpty
              >
                <MenuItem value={this.textType}>Paragraph</MenuItem>
                <MenuItem value={this.checkBoxType}>Checkboxes</MenuItem>
              </Select>
              <FormHelperText>Question Type</FormHelperText>
            </FormControl>
          </Grid>
          {question.type === this.checkBoxType ? (
            <Grid item xs={10}>
              <TextField
                name="options"
                className="question"
                label="options"
                placeholder="Options sepereated by lines (e.g. a\n b\n c\n d)"
                value={editPanel.state.question_array[index].options}
                onChange={e => this.handleTextInput(editPanel, index, e)}
                fullWidth
                multiline
              />
            </Grid>
          ) : (
            <div></div>
          )}
          <Grid item xs={2}>
            <IconButton
              aria-label="delete"
              onClick={e => this.removeQuestion(editPanel, index, e)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Survey;
