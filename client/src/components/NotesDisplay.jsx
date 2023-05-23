import React from "react";
import Note from "./Note";

function NotesDisplay({ notesList, loadNotes }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {notesList.map(note => (
                    <Note key={note.id} note={note} loadNotes={loadNotes} />
                ))}
            </tbody>
        </table>
    )
}

export default NotesDisplay;
