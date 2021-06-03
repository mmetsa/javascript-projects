import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { IAppUser } from "../../domain/IAppUser";
import { IHomework } from "../../domain/IHomework";
import { BaseService } from "../../services/base-service";

const TeacherSubjectDetails = () => {
    const { id } = useParams() as { id: string };

    const [students, setStudents] = useState<IAppUser[]>([]);
    const [pendingStudents, setpendingStudents] = useState<IAppUser[]>([]);
    const [homeworks, setHomeworks] = useState<IHomework[]>([]);

    const appState = useContext(AppContext);
    const history = useHistory();

    const loadData = async () => {
        let result = await BaseService.getAll<IAppUser>(
            "/subjects/" + id + "/enrolledstudents",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setStudents(result.data);
        }

        let res = await BaseService.getAll<IAppUser>(
            "/subjects/" + id + "/pendingstudents",
            appState.jwt ?? ""
        );
        if (res.ok && res.data) {
            setpendingStudents(res.data);
        }

        let hws = await BaseService.getAll<IHomework>(
            "/subjects/" + id + "/homeworks",
            appState.jwt ?? ""
        );
        if (hws.ok && hws.data) {
            setHomeworks(hws.data);
        }
    };

    const enRoll = async (e: any, userId: string) => {
        let obj = {
            userId: userId,
            subjectId: id,
        };

        let result = await BaseService.post<IAppUser>(
            "/subjects/" + id + "/enroll",
            obj,
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            loadData();
        }
    };

    const deny = async (e: any, userId: string) => {
        let obj = {
            userId: userId,
            subjectId: id,
        };

        let result = await BaseService.post<IAppUser>(
            "/subjects/" + id + "/deny",
            obj,
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            loadData();
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h4>Enrolled students</h4>
                        <hr />
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <td>First name</td>
                                    <td>Last name</td>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <h4>Pending students</h4>
                        <hr />
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <td>First name</td>
                                    <td>Last name</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>
                                                <button
                                                    className="btn btn-link"
                                                    onClick={(e) =>
                                                        enRoll(e, item.id)
                                                    }>
                                                    Enroll
                                                </button>
                                                |
                                                <button
                                                    className="btn btn-link"
                                                    onClick={(e) =>
                                                        deny(e, item.id)
                                                    }>
                                                    Deny
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <h4>Homeworks</h4>
                        <hr />
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>Deadline</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {homeworks.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.deadline}</td>
                                            <td>
                                                <Link
                                                    to={
                                                        "/teacher/subjects/" +
                                                        id +
                                                        "/homeworks"
                                                    }>
                                                    Watch
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={(e) =>
                            history.push(
                                "/teacher/subjects/" + id + "/homework"
                            )
                        }>
                        Add new Homework
                    </button>
                </div>
                <div>
                    <Link to="/teacher/subjects">Back to List</Link>
                </div>
            </div>
        </>
    );
};

export default TeacherSubjectDetails;
