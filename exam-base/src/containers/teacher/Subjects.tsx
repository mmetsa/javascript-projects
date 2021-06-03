import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { ISubject } from "../../domain/ISubject";
import { BaseService } from "../../services/base-service";

const TeacherSubjects = () => {
    const [subjects, setSubjects] = useState<ISubject[]>();
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<ISubject>(
            "/subjects",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            let subs = result.data;
            subs = subs.filter(
                (x) =>
                    x.teacherName ===
                    appState.firstName + " " + appState.lastName
            );
            setSubjects(subs);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Subjects you teach</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <Link className="btn btn-primary" to="/teacher/subjects/create">
                    Create new
                </Link>
            </div>
            <div className="row justify-content-center mt-3">
                <table className="table col-md-6 col-sm-12">
                    <thead>
                        <tr>
                            <th>Subject name</th>
                            <th>Description</th>
                            <th>Credits</th>
                            {appState.jwt && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {subjects?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.teacherName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.credit}</td>
                                    <td>
                                        <Link
                                            to={"/teacher/subjects/" + item.id}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TeacherSubjects;
