
export const loginAuth = (login_page, handle) => {
    const { userName, password } = login_page.state
    console.log(userName)
    console.log(password)


    if (userName === 'admin' && password === 'admin') {
        handle(0, "admin", "Admin", true)
        return 0;
    } else if (userName === 'user' && password === 'user') {
        handle(1, "user", "User", false)
        return 1;
    } else {
        // const username_field = login_page.getElementById("userName")
        // const password_field = login_page.getElementById("password")

        // username_field.error = true
        // password_field.error = true
        return 2;
    }
}

export const handle = (app) => (userId, userName, userDisplayName, admin) => {
    app.setState({
        userId: userId,
        userName: userName,
        userDisplayName: userDisplayName,
        admin: admin
    })
    console.log("Login successful")
}

export const login = (loginComp, app) => {
    // TODO: Send request to server
    console.log('Login get called')
    const { username, password } = loginComp.state;
    const user = {
        _id: '0',
        account_type: null,
        username: username,
        email: null
    }
    if (username === 'admin' && password === 'admin') {
        user.account_type = 'admin'
    } else if (username === 'user' && password === 'user') {
        user.account_type = 'standard'
    } else {
        // This case don't refresh the page
        return;
    }
    console.log('app.state before set', app.state);
    app.setState({ currentUser: user });
}