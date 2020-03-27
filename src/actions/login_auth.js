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

// A function to check if a user is logged in on the session cookie
export const readCookie = app => {
  const url = "/Login/check-session";

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.currentUser) {
        app.setState({ currentUser: json.currentUser });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = (loginComp, app) => {
  // TODO: Send request to server
  console.log("Login get called");

  const url = "/Login";
  const { username, password } = loginComp.state;
  const data = { username, password };

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        if (res.status === 400) {
          // TODO: Set app state as User not Found
          loginComp.setState({ errorNum: 1 });
        } else if (res.status === 500) {
          // TODO: Set app state as Server error
          loginComp.setState({ errorNum: 3 });
        }
        throw Error(JSON.stringify({ code: res.status }));
      }
    })
    .then(json => {
      console.log("json is", json);
      console.log("json.currentUser is", json.currentUser);
      if (json.currentUser !== undefined) {
        app.setState({ currentUser: json.currentUser });
        loginComp.props.history.push("/");
      } else {
        console.log("Find returnJson is null");
      }
    })
    .catch(error => {
      console.log(error);
    });
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

  const req = new Request(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  fetch(req).then(res => {
    // TODO: Added front end to initialize the
    if (res.status === 200) {
      console.log("Succeed to register the user");
      // TODO: Have some notification to tell the user succeed
      SignUpComp.props.history.push("/login");
    } else if (res.status === 403) {
      console.log("Duplicated User");
      SignUpComp.setState({ errorNum: 1 });
    } else {
      console.log("Internal server error");
      SignUpComp.setState({ errorNum: 3 });
    }
  });
};
