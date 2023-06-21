const express = require("express");
const db = require("../db/index");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

// Register a user
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Check username and password arent blank
        if (username.trim() === '' ) {
            return res.status(400).json({ error: "Username cannot be blank"})
        }
        if (password.trim() === '' ) {
            return res.status(400).json({ error: "Password cannot be blank"})
        }
        // Check if the username is already in use
        let results = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (results.rows.length > 0) {
            return res.status(409).json({ error: "Username already taken"});
        }
        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create the new user
        results = await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        // Log in the new user by calling next() to the passport.authenticate middleware
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}, passport.authenticate('local'), (req, res) => {
    res.status(201).json({ username: req.user.username })
})

// Login a user
router.post('/login', (req, res, next) => {
    // passport.authenticate is not being called as middleware here, but rather as a function call of middleware. This allows passport.authenticate to use a callback function
    passport.authenticate('local',
        // Options object (optional)
        { badRequestMessage: 'Username and password are required' }, // "Missing credintials" check occurs before custom checks. Override info message here
        // The (err, user, info) callback is used for more precise control. Needed to display custom error messages
        (err, user, info) => {
            if (err) return res.status(500).json({ error: "Internal Server Error" });
            if (!user) return res.status(401).json({ error: info.message });
            req.login(user, (err) => {
                if (err) return res.status(500).json({ error: "Internal Server Error" });
                return res.status(200).json({ message: "Login successful" });
            });
        }
    )(req, res, next); // Invoke the authenticate middleware function
})

// Logout a user
router.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(400);
        }
    });
    res.sendStatus(204);
})

// Check authentication
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) res.send({ authenticated: true });
    else res.status(401).send({ authenticated: false });
})

module.exports = router;
