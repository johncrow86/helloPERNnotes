# Hello PERN Notes

## Introduction
This is a full-stack notes application built using the PERN stack. PostgreSQL, Express.js, React.js, Node.js. A notes app (or todo app) is the Hello World of full-stack development. The goal of this app is to provide a simple walkthrough for building an app from scratch to completion. Each release will contain the minimum required code to implement a new feature along with proper commenting.


## Technologies Used
- PostgreSQL
- Express
- React
- Node.js
- Bootstrap

## Additional Tools Used
- Postbird
- Postman
- React Dev Tools
- Git

## Getting Started
To use this application, follow these steps:

- Pre-Setup: A code editor with Node.js, and PostgreSQL should be installed.
1. Clone the repository to your local machine.
2. Copy the server/db/db.sql file and run it in psql to set up the Postgres DB.
3. Navigate to the server folder.
4. Run 'npm install'.
5. Run the command 'nodemon index' to start the server.
6. Navigate to the client folder.
7. Run 'npm install'.
8. Run the command 'npm start' to start the React client.
9. Navigate to `http://localhost:3000` to use the application.


## Developer Note
This is a learning app.

## Author
- John Crow (https://github.com/johncrow86)

## Release Notes
v1.0

This is the MVP. Each tier of the architecture is built to be as simple and straightforward as possible while gradually introducing more features.

Model Layer
- Basic model layer.

Server Layer
1. Express - root package required to run the server.
2. express.json - middleware responsible for parsing the request body.
3. PG - package API required to connect to the PostgreSQL database.
4. Cors - package middleware required to interact with browser apps.
5. Nodemon - quality of life package responsible for restarting the server after saved changes.

Client Layer
1. React - root library required to run the client.

v2.0

Model Layer
- Added Roles.

Server Layer
1. Dotenv - package used to access .env variables.
- Added express.Router to seperate endpoints from the index file.

Client Layer
1. React-Router-Dom - routing package to allow multiple endpoints in React.
- Added individual note page route.

v3.0

Model Layer
- Added users table for Login.
- Added required user_id field for notes table.
- Added hashing function trigger (commented out, hashing handled by Bcrypt).

Server Layer
1. Express-Session - package middleware responsible for managing sessions.
2. Bcrypt - package responsible for password hashing.
3. Passport Passport-Local - 2 packages responsible for user authentication.
- Added users routes.
- Created auth logic in passport.config with proper error handling.
- Created auth middleware and added to notes routes.

Client Layer
- Added user login/register route.
- Created a UserContext.
- Created a NavBar component.
- Created a PrivateRoutes component and added private routing to App.js.
