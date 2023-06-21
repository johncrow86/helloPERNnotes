const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/index");
const bcrypt = require("bcrypt");

// Set the entire passport module equal to an anonymous function and invoke the function when you require it
module.exports = function (passport) {
    // Verify
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            // Check username and password arent blank
            if (username.trim() === '') return done(null, false, { message: "Username cannot be blank"});
            if (password.trim() === '') return done(null, false, { message: "Password cannot be blank"});
            // Check for user
            const results = await db.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );
            if (results.rows.length === 0) return done(null, false, { message: "User not found" });
            // Check password match
            const passwordMatch = await bcrypt.compare(password, results.rows[0].password)
            if (!passwordMatch) return done(null, false, { message: "Incorrect password" });
            // Authenticate user
            const user = results.rows[0];
            return done(null, user);
        } catch {
            console.error(err);
            return done(err);
        }
    }));

    // Serialize
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize
    passport.deserializeUser(async (id, done) => {
        try {
            const results = await db.query(
                "SELECT * FROM users WHERE id = $1",
                [id]
            );
            if (results.rows.length === 0) return done(new Error("User not found during passport deserialize"));
            const user = results.rows[0];
            done(null, user);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });
}
