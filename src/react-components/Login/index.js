import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { loginAuth } from '../../actions/login_auth'
import './style.css';


class SignIn extends React.Component {

    state = {
        userName: "", 
        password: "",
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // log(name)
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value // [name] sets the object property name to the value of the 'name' variable.
        });
      };

    render() {
        return (
            <div id='login_page'>
                <div id='top_padding' />
                <div className='Login_panel'>
                    <div>
                        <h2>Sign In</h2>
                    </div>
                    <form className='form' noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="user_name"
                            label="User Name"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleInputChange}
                            autoComplete="user_name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='submit'
                            href='/admin'
                        >
                            Sign In
                    </Button>
                        <Grid container>
                            <Grid item xs={3}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Link>
                            </Grid>
                            <Grid item xs={9}>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>

        )
    }
}

export default SignIn;