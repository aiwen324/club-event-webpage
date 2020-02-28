import React from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import './style.css'

class Event_register extends React.Component {

    render() {

        return (
            <div className='register_field'>
                <form>
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        id="email"
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        id="first_name"
                        fullWidth
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        autoFocus
                        />
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        id="last_name"
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        autoFocus
                        />
                </form>
                <div id='vertical_padding'/>
                <Button type="submit"
                    variant="contained"
                    color="primary">Register Event</Button>
            </div>
        )
    }
}

export default Event_register;