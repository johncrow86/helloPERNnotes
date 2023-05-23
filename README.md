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
V1.0

This is the MVP. Each tier of the architecture is built to be as simple and straightforward as possible.

Model Layer
- Basic model layer.

Server Layer
- Express - root package required to run the server.
- express.json - middleware responsible for parsing the request body.
- PG - package API required to connect to the PostgreSQL database.
- Cors - package middleware required to interact with browser apps.
- Nodemon - quality of life package responsible for restarting the server after saved changes.

Client Layer
- React - root library required to run the client.
