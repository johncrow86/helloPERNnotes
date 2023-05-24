import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function NotesDisplay({ note, loadNotes }) {
    const [ newDescription, setNewDescription ] = useState(note.description);
    const navigate = useNavigate();

    function handleView() {
        navigate(`notes/${note.id}`);
    }

    async function handleEdit() {
        try {
            const body = { description: newDescription };
            const response = await fetch(`http://localhost:5000/api/notes/${note.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            loadNotes();
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${note.id}`, {
                method: "DELETE"
            });
            loadNotes();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <tr>
            <th scope="row">{note.id}</th>
            <td>{note.description}</td>
            <td><button type="button" className="btn btn-primary" onClick={handleView}>View</button></td>
            <td><button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${note.id}`}>Edit</button></td>
            <td><button className="btn btn-danger" onClick={handleDelete}>Delete</button></td>
        </tr>
        <div className="modal fade" id={`id${note.id}`} tabIndex="-1" aria-labelledby="editNoteLabel" aria-hidden="true" onClick={() => setNewDescription(note.description)}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editNoteLabel">Edit Note</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setNewDescription(note.description)}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setNewDescription(note.description)}>Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NotesDisplay;
