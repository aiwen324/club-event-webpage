# UTACG Event and Survey Platform

## Team 41

Our project is an event and survey platform for a ACG _(Anime, Comic and Games)_ related student organization. The platform enables the administrators of the organization to collect registerations for events and conduct surveys on all organization-related issues.

To launch the project visit [https://blooming-beyond-39581.herokuapp.com](https://blooming-beyond-39581.herokuapp.com).

---

## Sign In and Sign Out

The platform has different functionalities and interfaces for _Admins_ and _General Users_. To sign in, hit the "_Sign in_" button on the very right of the navigation bar. Note that after a successful sign-in, the button's caption will become the display name of the user.

### To Sign In as an Admin

- **Username**: admin
- **Password**: admin

After a successful sign-in. the user will be brought to the homepage.

### To Sign In as a General User

- **Username**: user
- **Password**: user

After a successful sign-in. the admin will be brought to the admin dashboard. See [The Admin Dashboard](#the-admin-dashboard) section below for details.

### To Sign Out

All users can sign out of their accounts from the _Sign Out_ button, appearing on the left their user name after they sign in.

For Admin users, an additional _Sign Out_ button is placed in the bottom left corner of the Admin Dashboard.

---

## Announcement

The main contents, including all surveys, are called "announcements" in the platform.

### To Browse an Announcement

On the home page, scroll down or hit the _Announcements_ button on the navigation bar to see a list of current announcements. Hit any item in the list to see the contents of the announcement.

### Viewing an Annoucement as a General User

As a general user, one can submit responses to the questionaire embedded within an announcement, and submit new comments in the comment section located at the bottom of the announcement page. If an announcement includes the registration to an event, the user can also submit an registration.

### Viewing an Announcement as an Admin

As an admin, one can see the submitted responses to each of the questions in an announcement.

- For Checkboxes (Multiple Choices) questions, an admin can view the see the distribution of different choices in the submitted responses, visualized with a bar chart and a percentage.
- For Free Response questions, an admin can view the list of all submitted responses.
- If the annoucement contains registration to an event, the admin can also see the number of users already submitted an registration.

An admin can also submit new comments in the comment section as a general user is enabled to.

---

## The Admin Dashboard

Admin users have a dashboard, which enables them to manage all events/surveys and add new ones. To access the dashboard, sign in as an admin user and you will be automatically directed to the dashboard. Alternatively, an admin can access the dashboard from the homepage by clicking on the user name.

### To Browse Results of Existing Annoucements

The dashboard contains a list of existing announcement, in the same way as they appear on the home page. To see the results of any one of these announcements, hit the item in the list, and the admin will be brought to the same announcement result page as what they see from the home page.

### To Add a New Announcement

To add a new announcement, hit the _New Announcement_ button on top of the list of existing announcements, and the admin will be brought to the New Announcement page. The admin will be enabled to add a title and an description (body) to new announcement and upload images if needed.

The admin can opt to attach an event registration form by checking _Add Registeration Field_, and/or opt to add a survey questionaire by checking _Add Survey_. If _Add Survey_ is checked, a new form will appear in the bottom of the page.

#### Survey Questionaire Form

To add a survey questionaire, the admin should edit the survey questionaire form. The admin can choose to add a question by hitting the _Add Question_ button, or remove a question by hitting the bin on the bottom-right side of the question box. The admin can choose whether to make the question a checkbox (multiple choices) question or a free response one; if the question is a checkbox one, the admin should provide the options in the _Options_ column, and separate each options using a semicolon (;).
