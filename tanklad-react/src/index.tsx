import "bootstrap";
import "popper.js";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <div className="container">
                <App></App>
            </div>
        </React.StrictMode>
    </Router>,
    document.getElementById("root")
);
