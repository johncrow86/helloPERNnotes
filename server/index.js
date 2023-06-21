// Requires
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./passport-config")(passport);

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // parses the data from the req.body object
app.use(cors({ // needed to accept requests from browser apps
    origin: ["http://localhost:3000"], // * by default. Wildcard value is not allowed when credentials is set to true
    credentials: true // needed to transmit session data
}));
const store = new session.MemoryStore();
app.use(session({ // sets a session cookie
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store
}))
app.use(passport.initialize());
app.use(passport.session());

// Routes
const usersRouter = require("./routes/users");
app.use('/api/users', usersRouter);

const notesRouter = require("./routes/notes");
app.use('/api/notes', checkAuth, notesRouter);

// Start the server
const PORT = process.env.EXPESS_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server has started on port 5000`);
})



// Authentication Middleware
function checkAuth (req, res, next) {
    if (req.isAuthenticated()) next();
    else res.status(401).send({ error: "Not Authenticated" });
}
