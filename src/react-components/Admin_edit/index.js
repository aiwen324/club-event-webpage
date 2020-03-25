import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css'
import Survey from './survey'



class AdminEdit extends React.Component {

    state = {
        reg_field: false,
        survey: true,
        question_type: 10,
        question_array: [
            { index: 0, type: 10, options: '' },
        ],
    }

    addQuestion = (e) => {
        const question_array = this.state.question_array;
        const new_question = {
            index: question_array.length,
            type: 10,
            options: '',
        }
        question_array.push(new_question)
        this.setState({ question_array: question_array })
    }

    removeQuestion = (edit_panel) => (survey) => (event) => {
        const survey_index = survey.state.index;
        const question_array = edit_panel.state.question_array;
        question_array.splice(survey_index, 1);
        edit_panel.setState({ question_array: question_array })
    }

    // Handle Checkbox for Register Field and Survey
    handleChange = (name) => {
        return (event) => {
            this.setState({ [name]: event.target.checked });
        }
    };

    handleChange2 = (event) => {
        console.log("Get event value", event.target.value)
        this.setState({ question_type: event.target.value });
    }

    render() {

        const { reg_field, survey } = this.state;

        // const { classes } = this.props;
        return (
            <div className='Edit_panel'>
                <form className='edit_form'>
                    <TextField
                        id='announce_title'
                        className='input_field'
                        label='Title'
                        placeholder='Title'
                        fullWidth />
                    <TextField
                        id="announce_desc"
                        className='input_field'
                        label="Announcement Description"
                        placeholder="Enter the description"
                        multiline
                        rows="5"
                        fullWidth
                        variant="outlined"
                    />
                    <input
                        accept="image/*"
                        className='input'
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload Images
                        </Button>
                    </label>
                    <Button variant="contained" color="primary" component="span">
                        Post Announcement
                    </Button>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={reg_field} onChange={this.handleChange('reg_field')} value="reg_field" />}
                            label="Add Registration Field"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={survey} onChange={this.handleChange('survey')} value="survey" />}
                            label="Add Survey"
                        />
                    </FormGroup>
                    {
                        this.state.survey ?
                            <div>
                                {this.state.question_array.map(question => (<Survey {...this.state.question_array[0]} removeQuestion={this.removeQuestion(this)} />))}
                                <Button variant="contained" color="primary" component="span" onClick={this.addQuestion}>
                                    Add Question
                                </Button>
                            </div>
                            :
                            <div></div>
                    }
                </form>
            </div>
        )
    }
}

export default AdminEdit