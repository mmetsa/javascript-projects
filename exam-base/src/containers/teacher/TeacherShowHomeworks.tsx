import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { IUserHomework } from "../../domain/IUserHomework";
import { BaseService } from "../../services/base-service";
import { IMessages } from "../../types/IMessages";

const TeacherShowHomeworks = () => {
    const { id } = useParams() as { id: string };

    const [homeworks, setHomeworks] = useState<IUserHomework[]>([]);
    const appState = useContext(AppContext);
    const [grade, setGrade] = useState(0);

    const loadData = async () => {
        let result = await BaseService.getAll<IUserHomework>(
            "/subjects/" + id + "/usershomeworks",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setHomeworks(result.data);
        }
    };

    const changeGrade = async (hwId: string, appUserId: string) => {
        let obj = { homeworkId: hwId, appUserId: appUserId, grade: grade };
        let result = await BaseService.post<IMessages>(
            "/subjects/" + id + "/homeworks/update",
            obj,
            appState.jwt ?? ""
        );
        console.log(obj);
        if (result.ok && result.data) {
            console.log(result.data);
            loadData();
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Student homework submissions</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <table className="table col-md-8 col-sm-12">
                    <thead className="table-primary">
                        <tr>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Homework name</td>
                            <td>Homework submission</td>
                            <td>Grade</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {homeworks.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.appUser.firstname}</td>
                                    <td>{item.appUser.lastname}</td>
                                    {item.homework ? (
                                        <>
                                            <td>{item.homework.name}</td>
                                            <td>{item.work}</td>
                                            <td>{item.grade}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="Edit grade"
                                                    onChange={(e) =>
                                                        setGrade(
                                                            e.target
                                                                .valueAsNumber
                                                        )
                                                    }></input>
                                                <button
                                                    className="btn btn-link"
                                                    onClick={() =>
                                                        changeGrade(
                                                            item.homeworkId,
                                                            item.appUser.id
                                                        )
                                                    }>
                                                    Save
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>Not submitted yet</td>
                                            <td></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="Edit grade"
                                                    onChange={(e) =>
                                                        setGrade(
                                                            e.target
                                                                .valueAsNumber
                                                        )
                                                    }></input>
                                                <button
                                                    className="btn btn-link"
                                                    onClick={() =>
                                                        changeGrade(
                                                            item.homeworkId,
                                                            item.appUser.id
                                                        )
                                                    }>
                                                    Save
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TeacherShowHomeworks;
