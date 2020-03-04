import App from "../App"
import AdminDashboard from "../react-components/AdminDashboard"

export const loginAuth = (login_page, handle) => {
    const { userName, password } = login_page.state
    console.log(userName)
    console.log(password)

    const app_state = App.state

    if (userName == 'admin' && password == 'admin') {
        handle(0, "admin", "Admin", true)
    } else if (userName == 'user' && password == 'user') {
        handle(1, "user", "User", false)
    } else {
        // const username_field = login_page.getElementById("userName")
        // const password_field = login_page.getElementById("password")

        // username_field.error = true
        // password_field.error = true
    }
}