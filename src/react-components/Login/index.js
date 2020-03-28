import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { login } from "../../actions/login_auth";
import { Redirect } from "react-router-dom";
import "./style.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/login");
  }

  state = {
    username: "",
    password: "",
    errorNum: null, // 1: User not exists; 2: Field empty; 3. Server Error
    user_type: 2
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    // 'this' is bound to the component in this arrow function.
    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };

  handleClick = (e, app) => {
    e.preventDefault();
    if (!(this.state.password && this.state.username)) {
      this.setState({ errorNum: 2 });
    }
    login(this, app);
  };

  render() {
    const { handle, app } = this.props;
    let errorMsg;
    if (this.state.errorNum === 1) {
      errorMsg = (
        <Alert variant="outlined" severity="error">
          Credential error
        </Alert>
      );
    } else if (this.state.errorNum === 2) {
      errorMsg = (
        <Alert variant="outlined" severity="error">
          Please fill all fields
        </Alert>
      );
    } else if (this.state.errorNum === 3) {
      errorMsg = (
        <Alert variant="outlined" severity="error">
          Server Error, code: 500
        </Alert>
      );
    }
    return (
      <div id="login_page">
        <div id="top_padding" />
        <div className="Login_panel">
          <div>
            <h2>Sign In</h2>
          </div>
          {errorMsg}
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              value={this.state.username}
              onChange={this.handleInputChange}
              autoComplete="user_name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
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
              className="submit"
              onClick={e => this.handleClick(e, app)}
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
                <Link variant="body2" component={RouterLink} to="/signUp">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
