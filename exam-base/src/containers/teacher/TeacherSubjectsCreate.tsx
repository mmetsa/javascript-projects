import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { BaseService } from "../../services/base-service";
import { IMessages } from "../../types/IMessages";

const TeacherSubjectsCreate = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credit, setCredit] = useState(0);
    const appState = useContext(AppContext);
    const history = useHistory();

    const createSubject = async (e: any) => {
        let subject = {
            teacherName: appState.firstName + " " + appState.lastName,
            name: name,
            description: description,
            credit: credit,
        };
        console.log(subject);
        let response = await BaseService.post<IMessages>(
            "/subjects",
            subject,
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            history.push("/teacher/subjects");
        }
    };

    return (
        <>
            <div className="row justify-content-center">
                <h1>Create a new subject</h1>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credits">Credits</label>
                        <input
                            type="number"
                            className="form-control"
                            id="credits"
                            onChange={(e) => setCredit(e.target.valueAsNumber)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => createSubject(e)}>
                        Create
                    </button>
                    <div>
                        <Link to="/teacher/subjects">Back to List</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherSubjectsCreate;
