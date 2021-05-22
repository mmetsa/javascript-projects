import React, { useContext } from "react";
import { AppContext } from "../../context/AppState";

const Login = () => {
    const appState = useContext(AppContext);
    const toggleAuthStatus = () => {
        appState.setAuthInfo("af", "bf", "c");
    };
    return <div onClick={toggleAuthStatus}>Login or logout</div>;
};

export default Login;
