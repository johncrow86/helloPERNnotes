// Imports
import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
// Routes
import Root from "./routes/Root";
import Home from "./routes/Home";
import NoteDetails from "./routes/NoteDetails"

// Create router for RouteProvider
const router = createBrowserRouter( createRoutesFromElements( 
    <Route path='/' element={ <Root /> }>
        <Route index element={ <Home /> } />
        <Route path='notes/:id' element={ <NoteDetails /> } />
    </Route>
));

// Main App
function App() {
    return (
        <div className="container">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
