import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
    const [ loginName, setLoginName ] = useState('');
    const [ loginPass, setLoginPass ] = useState('');
    const [ registerName, setRegisterName ] = useState('');
    const [ registerPass, setRegisterPass ] = useState('');
    const [ error, setError ] = useState('')
    const { authenticated, setAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if authenticated
    useEffect(() => {
        if (authenticated) navigate('/');
    },[authenticated])

    async function handleLogin() {
        try {
            // Build Request
            const body = {
                username: loginName,
                password: loginPass
            }
            const response = await fetch(`http://localhost:5000/api/users/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include' // needed to transmit session data
            });
            const jsonData = await response.json();
            // Check for error
            if (!response.ok) return setError(jsonData.error);
            // Handle Success
            setAuthenticated(true);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    async function handleRegister() {
        try {
            // Build Request
            const body = {
                username: registerName,
                password: registerPass
            }
            const response = await fetch(`http://localhost:5000/api/users/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include' // needed to transmit session data
            });
            const jsonData = await response.json();
            // Check for error
            if (!response.ok) return setError(jsonData.error);
            // Handle Success
            setAuthenticated(true);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className="text-center">
            <h1>Login</h1>
            <div className="form-group">
                <label className="mr-2">Username: </label>
                <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} onClick={(e) => setError('')}></input>
            </div>
            <div className="form-group">
                <label className="mr-2">Password: </label>
                <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} onClick={(e) => setError('')}></input>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={error}>Login</button>
            <h3 className="mt-5">Register</h3>
            <div className="form-group">
                <label className="mr-2">Username: </label>
                <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} onClick={(e) => setError('')}></input>
            </div>
            <div className="form-group">
                <label className="mr-2">Password: </label>
                <input type="password" value={registerPass} onChange={(e) => setRegisterPass(e.target.value)} onClick={(e) => setError('')}></input>
            </div>
            <button type="button" className="btn btn-secondary" onClick={handleRegister} disabled={error}>Register</button>
            {error && <p className="text-danger">{error}</p>}
        </form>
    )
}

export default Login;
