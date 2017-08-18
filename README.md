# Craft Sales Project MEAN Stack Single Page Application (Cardinal Reports)

This application will be used to visualize and leverage sales data for Cardinal Spirits LLC.

## Installation
1. Download the repository
2. Install npm modules: `npm install`
4. Start up the server: `node bin/www`
5. View in browser at http://localhost:3000

## Future Additions
- Graphs
- Data

Import XSLX

Import PDF

- Style
- Map
- Change Password

## Running the app

- Production environment:
-- https://craftsalesproject.herokuapp.com/
- Run
-- $ node bin/www

## App Files

- app_api/config/passport.js

Passport exists as part of the authentication features of this application. It contains the function to check whether a user exists in the database and if so if a given password matches the user.

- app_api/controllers/authentication.js

Authentication houses the functions pertaining to the backend that have to do with the users in the database. These functions include usersGrab, register, login, permissions, and settingsChange.

- app_api/controllers/data.js

Data houses the functions pertaining to the backend that have to do with the customers in the database. These functions include upload, register, addSale, salesGrab, and accountsGrab.

- app_api/models/customers.js

Customers houses the mongodb models for sales, comments, and customers. Both sales and comments models are used in the customer model.

- app_api/models/db.js

Db houses the functions to connect the app to the database, including the dbURI variable, in which the environment variable (database location, username, password) must be set.

- app_api/models/users.js

Users houses the mongodb model for users.

- app_client/app.min.js

App.min.js is a compilation of all other javascript in the application. This allows for only one javascript file to be called for the front end. App.min.js is compiled by execution of the Gulpfile.

- app_client/app.min.js.map

Similarly to App.min.js, App.min.js.map is compiled by execution of the Gulpfile.

- app_client/auth/login/login.controller.js

Login.controller houses the front end javascript for the login page. This is compiled into app.min.js by the gulpfile.

- app_client/auth/login/login.view.html

Login.view houses all of the html specifically for the login page. This is injected into the index.html when called.

- app_client/auth/register/register.controller.js

Register.controller houses the front end javascript for the register page. This is compiled into app.min.js by the gulpfile.

- app_client/auth/register/register.view.js

Register.view houses all of the html specifically for the register page. This is injected into the index.html when called.

- app_client/common/directives/navigation/img

Img contains the images used by the navigation bar.

- app_client/common/directives/navigation/navigation.view.html

Navigation.view houses all of the html specifically for the navigation bar. This is injected into the index.html when called.

- app_client/common/directives/navigation/navigation.directive.js

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11

- app_client/common/directives/navigation/navigation.controller.js

navigation.controller houses the front end javascript for the navigation bar. This is compiled into app.min.js by the gulpfile.

- app_client/common/directives/common/services/authentication.service.js

Authentication.service connects all of the calls from the front end controllers to the back end controllers for the functions related to the user objects in the database.

- app_client/common/directives/common/services/data.service.js

Data.service connects all of the calls from the front end controllers to the back end controllers for the functions related to the customer objects in the database.

- app_client/dashboard/dashboard.html

Dashboard houses all of the html specifically for the Dashboard view. This is injected into the index.html when called.

- app_client/dashboard/dashboard.css

?????????????????????????????????

- app_client/dashboard/dashboard.controller.js

Dashboard.controller houses the front end javascript for the dashboard page. This is compiled into app.min.js by the gulpfile.

- app_client/dashboard/dashboard.controller.js

Dashboard.controller houses the front end javascript for the dashboard page. This is compiled into app.min.js by the gulpfile.

- app_client/index.html

Index.html houses the index file for the application. This calls all of the css, the javascript, and the views.

- app_client/main.js

Main.js establishes the routes for the index to take views from their respective html files. It also establishes whether or not a user has the privilege to see a certain view.

- app_client/reports/reports.html

Reports houses all of the html specifically for the reports view. This is injected into the index.html when called.

- app_client/reports/reports.controller.js

Reports.controller houses the front end javascript for the reports page. This is compiled into app.min.js by the gulpfile.

- app_client/settings/settings.html

Settings houses all of the html specifically for the settings view. This is injected into the index.html when called.

- app_client/settings/settings.controller.js

Settings.controller houses the front end javascript for the settings page. This is compiled into app.min.js by the gulpfile.

- app_client/splash/splash.view.html

Splash houses all of the html specifically for the splash view. This is injected into the index.html when called.

- app_client/users/users.view.html

Users houses all of the html specifically for the users view. This is injected into the index.html when called.

- app_client/users/users.controller.js

Users.controller houses the front end javascript for the users page. This is compiled into app.min.js by the gulpfile.

- bin/www

Www is the code that serves the app. See “Running the app”

- bower_components

Bower_components houses all of the bower components being used by our app.

- node_modules

Node_modules houses all of the node modules being used by our app.

- public/lib

Lib houses all of the css and js code being referenced from bootstrap, angularjs, and jquery.

- public/stylesheets

???????????

- routes/index.js

Index.js contains express code to handle router.get requests.

- routes/users.js

Users.js contains express code to handle router.get requests.

- gulpfile.js

Gulpfile aggregates all of the front end javascript into one file to be called by the app. To run the gulpfile: $ gulp

- nodemon.json

???

- package.json

Package.json holds the versions of all of the packages installed by node.
