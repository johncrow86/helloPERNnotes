// Imports
import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Routes
import Root from "./routes/Root";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./routes/Home";
import Login from "./routes/Login";
import NoteDetails from "./routes/NoteDetails"
import NavBar from "./components/NavBar";

// Context
import { UserContextProvider } from "./context/UserContext";

// Main App
function App() {
    return (
        <UserContextProvider>
        <BrowserRouter>
            <NavBar />  {/*Set a Navigation Bar at the top of every page*/}
            <div id="top-space" style={{ height: "200px" }}></div> {/*Add some space to the top of every page*/}
            <div className="container"> {/*Create a boostrap container to center the app*/}
            <Routes>
                <Route element={<PrivateRoutes />}> {/*Private route wrapper*/}
                    <Route path="/" element={<Root />} >
                        <Route index element={<Home />} />
                        <Route path="notes/:id" element={<NoteDetails />} />
                    </Route>
                </Route> {/*End private routes*/}
                <Route path="/login" element={<Login />} />
            </Routes>
            </div>
        </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
