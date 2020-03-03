import React from 'react'
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import './survey.css'






class Survey extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            type: 10,
            options: ''
        }
    }

    handleChange2 = (event) => {
        console.log(this.state)
        console.log("Get event value", event.target.value)
        this.setState({ ['type']: event.target.value });
    }


    render() {

        const { removeQuestion } = this.props;
        return (
            <div className='question_section'>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <TextField
                            className='question'
                            label='Question'
                            placeholder='Question'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <Select value={this.state.type} onChange={this.handleChange2} displayEmpty>
                                <MenuItem value={10}>Checkboxes</MenuItem>
                                <MenuItem value={20}>Paragraph</MenuItem>
                            </Select>
                            <FormHelperText>Question Type</FormHelperText>
                        </FormControl>
                    </Grid>
                    {
                        this.state.type == 10 ?
                            <Grid item xs={10}>
                                <TextField
                                    className='question'
                                    label='options'
                                    placeholder='Options sepereated by ; (e.g. a; b; c; d)'
                                    fullWidth
                                    multiline
                                />
                            </Grid> :
                            <div></div>
                    }
                    <Grid item xs={2}>
                        <IconButton aria-label="delete" onClick={removeQuestion(this)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Survey;