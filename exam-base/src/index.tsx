import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "bootstrap";
import "popper.js";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
    document.getElementById("root")
);
