import React, { useState } from "react";

function AddNote({ loadNotes }) {
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/api/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include' // needed to transmit session data
            });
            const jsonData = await response.json();
            if (!response.ok) return setError(jsonData.error);
            setDescription('');
            loadNotes();
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form className="text-center" onSubmit={handleSubmit}>
            <h6>Add a Note</h6>
            <div className="form-group d-flex">
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} onClick={() => setError(false)}></input>
                <button type="submit" className="btn btn-success">Add</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </form>
    )
}

export default AddNote;
