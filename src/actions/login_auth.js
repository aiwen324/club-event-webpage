import App from "../App"
import AdminDashboard from "../react-components/AdminDashboard"
import {useHistory} from "react-router-dom"

export const loginAuth = (login_page, handle) => {
    const { userName, password } = login_page.state
    console.log(userName)
    console.log(password)

    const app_state = App.state

    if (userName == 'admin' && password == 'admin') {
        handle(0, "admin", "Admin", true)
        return 0;
    } else if (userName == 'user' && password == 'user') {
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