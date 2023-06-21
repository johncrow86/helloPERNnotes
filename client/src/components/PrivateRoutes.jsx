import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoutes() {
    const { authenticated } = useContext(UserContext);

    return (
        authenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;
