import { Redirect } from "react-router-dom";

export const loginAuth = (login_page, handle) => {
  const { userName, password } = login_page.state;
  console.log(userName);
  console.log(password);

  if (userName === "admin" && password === "admin") {
    handle(0, "admin", "Admin", true);
    return 0;
  } else if (userName === "user" && password === "user") {
    handle(1, "user", "User", false);
    return 1;
  } else {
    // const username_field = login_page.getElementById("userName")
    // const password_field = login_page.getElementById("password")

    // username_field.error = true
    // password_field.error = true
    return 2;
  }
};

export const handle = app => (userId, userName, userDisplayName, admin) => {
  app.setState({
    userId: userId,
    userName: userName,
    userDisplayName: userDisplayName,
    admin: admin
  });
  console.log("Login successful");
};

export const login = (loginComp, app) => {
  // TODO: Send request to server
  console.log("Login get called");
  const { username, password } = loginComp.state;
  const user = {
    _id: "0",
    account_type: null,
    username: username,
    email: null
  };
  if (username === "admin" && password === "admin") {
    user.account_type = "admin";
  } else if (username === "user" && password === "user") {
    user.account_type = "standard";
  } else {
    // This case don't refresh the page
    return;
  }
  console.log("app.state before set", app.state);
  app.setState({ currentUser: user });
};

export const signup = SignUpComp => {
  const url = "/signUp";

  const data = {
    username: SignUpComp.state.username,
    password: SignUpComp.state.password,
    email: SignUpComp.state.email,
    accountType: 0,
    phoneNumber: null
  };

  console.log(data);

  // const request = new Request(url, {
  //   method: "post",
  //   body: JSON.stringify(data),
  //   headers: {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json"
  //   }
  // });
  const request = new Request("https://example.com", {
    method: "POST",
    body: '{"foo": "bar"}',
    headers: { "Content-Type": "application/json" }
  });

  console.log("Get here");
  console.log(request.body);
  // fetch(request).then(res => {
  //   // TODO: Added front end to initialize the
  //   if (res.status === 200) {
  //     console.log("Succeed to register the user");
  //     // TODO: Have some notification to tell the user succeed
  //     SignUpComp.props.history.push("/login");
  //   } else if (res.status === 403) {
  //     console.log("Duplicated User");
  //     // TODO Have some notification to tell the user duplicate
  //     SignUpComp.setState({ dupUser: true });
  //   } else {
  //     console.log("Internal server error");
  //     SignUpComp.setState({ serverError: true });
  //   }
  // });
};
