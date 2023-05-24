// Requires
require('dotenv').config()
const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // parses the data from the req.body object
app.use(cors()); // needed to accept request from browser apps

// Routes
const notesRouter = require("./routes/notes");
app.use(`/api/notes`, notesRouter);

// Start the server
const PORT = process.env.EXPESS_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server has started on port 5000`);
})
