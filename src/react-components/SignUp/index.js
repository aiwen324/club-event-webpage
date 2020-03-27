import React from "react";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Avatar,
  withStyles,
  Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { signup } from "../../actions/login_auth";

const styles = theme => ({
  container: {
    backgroundColor: "white",
    borderRadius: "5%"
  },
  paper: {
    backgroundColor: "white",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    dupUser: false,
    serverError: false
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

  render() {
    const classes = this.props.classes;
    return (
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            {this.state.dupUser ? (
              <Alert variant="outlined" severity="error">
                Username or Email already exists
              </Alert>
            ) : (
              <div></div>
            )}
            {this.state.serverError ? (
              <Alert variant="outlined" severity="error">
                Server Error, code: 500
              </Alert>
            ) : (
              <div></div>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              autoComplete="username"
              value={this.state.username}
              onChange={this.handleInputChange}
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                signup(this);
              }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
