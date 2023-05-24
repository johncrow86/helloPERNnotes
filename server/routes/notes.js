const express = require("express");
const db = require("../db/index");

const router = express.Router();

// Create a note
router.post('/', async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) return res.status(400).json({ error:"Description Needed" })
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
router.get('/', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM notes ORDER BY id");
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
})

// Get a note
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;
