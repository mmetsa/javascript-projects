import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { ISubject } from "../../domain/ISubject";
import { BaseService } from "../../services/base-service";

const StudentSubjects = () => {
    const [subjects, setSubjects] = useState<ISubject[]>();
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<ISubject>(
            "/subjects/student/obj",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setSubjects(result.data);
        }
    };

    let { url } = useRouteMatch();

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>My subjects</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <table className="table col-md-6 col-sm-12">
                    <thead>
                        <tr>
                            <th>Teacher</th>
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
                                            to={
                                                `${url}/` +
                                                item.id +
                                                "/homeworks"
                                            }>
                                            Homeworks
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

export default StudentSubjects;
