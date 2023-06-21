import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function NoteDetails() {
    const [ note, setNote ] = useState({});
    const { id } = useParams();

    useEffect(() => {
        loadNote();
    }, [])

    async function loadNote() {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                credentials: 'include' // needed to transmit session data
            });
            const jsonData = await response.json();
            setNote(jsonData);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className="text-center">
            <h1>Note Details</h1>
            <div className="form-group">
                <h6>{note.id}</h6>
                <p>{note.description}</p>
            </div>
        </form>
    )
}

export default NoteDetails ;
