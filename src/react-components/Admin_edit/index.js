import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css'
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = theme => ({
    edit_form: {
        width: '70%',
        '& > *': {
            margin: theme.spacing(2),
        },
        margin: "0 auto",
        marginTop: '20pt',
        textAlign: "left",
    },
    input: {
        display: 'none',
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    question_section: {
        width: '50%',
    },
});



class AdminEdit extends React.Component {

    state = {
        reg_field: false,
        survey: true,
        question_type: 10,
        question_array: [
            { index:0, type:10, options:''},
        ],
    }

    handleChange = (name) => {
        return (event) => {
            this.setState({ [name]: event.target.checked });
        }
    };

    handleChange2 = (event) => {
        console.log("Get event value", event.target.value)
        this.setState({ ['question_type']: event.target.value });
    }

    render() {

        const { reg_field, survey, age } = this.state;

        const { classes } = this.props;
        return (
            <div className='Edit_panel'>
                <form className={classes.edit_form}>
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
                        fullWidth='true'
                        variant="outlined"
                    />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload Images
                        </Button>
                    </label>
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
                            <Paper className={classes.question_section}>
                                <Grid container spacing={2}>
                                    <Grid item xs={7}>
                                        <TextField
                                            className='question'
                                            label='Question'
                                            placeholder='Question'
                                            fullWidth='true'
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl className={classes.formControl}>
                                            <Select value={this.state.question_type} onChange={this.handleChange2} displayEmpty className={classes.selectEmpty}>
                                                <MenuItem value={10}>Checkboxes</MenuItem>
                                                <MenuItem value={20}>Paragraph</MenuItem>
                                            </Select>
                                            <FormHelperText>Select question type</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    {
                                        this.state.question_type == 10 ?
                                            <Grid item xs={10}>
                                                <TextField
                                                    className='question'
                                                    label='options'
                                                    placeholder='Options sepereated by ; (e.g. a; b; c; d)'
                                                    fullWidth='true'
                                                    multiline
                                                />
                                            </Grid>
                                            :
                                            <div></div>
                                    }
                                </Grid>
                            </Paper>
                            :
                            <div></div>
                    }
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(AdminEdit)