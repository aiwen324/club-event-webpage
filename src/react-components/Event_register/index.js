import React from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

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
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        autoFocus
                        />
                    <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        autoFocus
                        />
                </form>
                <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary">Register Event</Button>
            </div>
        )
    }
}

export default Event_register;