import React, { useState, useEffect } from "react";
// Components
import AddNote from "../components/AddNote";
import NotesDisplay from "../components/NotesDisplay";

function App() {
    const [ notesList, setNotesList ] = useState([]);

    useEffect(() => {
        loadNotes();
    },[])

    async function loadNotes() {
        try {
            const response = await fetch(`http://localhost:5000/api/notes`);
            const jsonData = await response.json();
            setNotesList(jsonData);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1 className="text-center my-5">Hello PERN Notes!!</h1>
            <AddNote loadNotes={loadNotes} />
            <NotesDisplay notesList={notesList} loadNotes={loadNotes} />
        </div>
    );
}

export default App;
