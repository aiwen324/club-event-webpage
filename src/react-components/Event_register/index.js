import React from 'react';
import { TextField, Box, Button } from '@material-ui/core';

import './style.css'

class Event_register extends React.Component {

    render() {
        return (
            <div className='register_field'>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        autoFocus
                        />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
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