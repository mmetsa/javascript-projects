import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppState";

const Header = () => {
    const appState = useContext(AppContext);

    const resetState = () => {
        appState.setAuthInfo(null, "", "");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        StudySystem
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark"
                                    to="/Subjects">
                                    All Subjects
                                </Link>
                            </li>
                            {appState.role === "Admin" && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-dark"
                                            to="/Admin/Homeworks">
                                            Homeworks
                                        </Link>
                                    </li>
                                </>
                            )}
                            {appState.role === "Teacher" && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-dark"
                                        to="/teacher/subjects">
                                        My subjects
                                    </Link>
                                </li>
                            )}
                            {appState.role === "Student" && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-dark"
                                        to="/student/subjects">
                                        My subjects
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        {appState.jwt != null ? (
                            <>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle text-dark"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        {appState.firstName} {appState.lastName}
                                    </Link>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown">
                                        <Link
                                            className="nav-link text-dark"
                                            to="/account">
                                            Profile
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link text-dark"
                                        to="/"
                                        onClick={() => resetState()}>
                                        Log out
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link text-dark"
                                        to="/account/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link text-dark"
                                        to="/account/register">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
