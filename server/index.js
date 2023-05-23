// Requires
const express = require("express");
const cors = require("cors");
const db = require("./db/index")

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // parses the data from the req.body object
app.use(cors()); // needed to accept request from browser apps

// Routes
// Create a note
app.post('/api/notes', async (req, res) => {
    try {
        const { description } = req.body;
        const results = await db.query(
            "INSERT INTO notes (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.status(201).json(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Get all notes
app.get('/api/notes', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM notes ORDER BY id");
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Get a note
app.get('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const results = await db.query(
            "SELECT * FROM notes WHERE id = $1",
            [id]
        );
        res.json(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const results = await db.query(
            "UPDATE notes SET description = $1 WHERE id = $2 RETURNING *",
            [description, id]
        );
        res.json(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(
            "DELETE FROM notes WHERE id = $1",
            [id]
        );
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Start the server
app.listen(5000, () => {
    console.log(`Server has started on port 5000`);
})
