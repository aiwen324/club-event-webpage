import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css'

const useStyles = theme => ({
    edit_form: {
      width: '70%',
      '& > *': {
        margin: theme.spacing(2),
      },
      margin: "0 auto",
      marginTop: '5%',
      textAlign: "left",
    },
  });



class AdminEdit extends React.Component{

    render() {
        const { classes } = this.props;
        return (
            <div className='Edit_panel'>
            {/* <form className='Edit_form'> */}
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
                    fullWidth='true'
                    variant="outlined"
                    />
                <Button variant="contained" color="primary">
                    Upload Image
                </Button>
                <Button variant="contained" color="primary">
                    Add Registration Field
                </Button>
                <Button variant="contained" color="primary">
                    Add Survey form
                </Button>
            </form>
        </div>
        )
    }
}

export default withStyles(useStyles)(AdminEdit)