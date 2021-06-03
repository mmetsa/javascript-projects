import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { IHomework } from "../../domain/IHomework";
import { IUserHomework } from "../../domain/IUserHomework";
import { BaseService } from "../../services/base-service";
import { IMessages } from "../../types/IMessages";

const SubjectHomeworks = () => {
    const { id } = useParams() as { id: string };
    const appState = useContext(AppContext);

    const [works, setWorks] = useState<IUserHomework[]>([]);
    const [subjectHomeworks, setSubjectHomeworks] = useState<IHomework[]>([]);

    const [homework, setHomework] = useState("");

    const submitHomework = async (e: any, homeworkId: string) => {
        let response = await BaseService.post<IMessages>(
            "/subjects/" + id + "/homeworks/submit",
            { work: homework, homeworkId },
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            loadData();
        }
    };

    const calculateAverage = () => {
        let total = subjectHomeworks.length;
        let sum = 0;
        works.forEach((x) => (sum += x.grade));
        return <>{sum / total}</>;
    };

    const loadData = async () => {
        let response = await BaseService.getAll<IUserHomework>(
            "/subjects/" + id + "/userhomeworks",
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            setWorks(response.data);
        }

        let res = await BaseService.getAll<IHomework>(
            "/subjects/" + id + "/homeworks",
            appState.jwt ?? ""
        );
        if (res.ok && res.data) {
            setSubjectHomeworks(res.data);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Subject homeworks</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <h5>Your average grade: {calculateAverage()}</h5>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12 mt-5">
                    <table className="table">
                        <thead className="table-primary">
                            <tr>
                                <td>Homework name</td>
                                <td>Homework details</td>
                                <td>Homework deadline</td>
                                <td>Grade</td>
                                <td>Submit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectHomeworks.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.deadline}</td>
                                        {works.filter(
                                            (x) => x.homework.id === item.id
                                        ).length > 0 ? (
                                            <td>
                                                {
                                                    works!.filter(
                                                        (x) =>
                                                            x.homework.id ===
                                                            item.id
                                                    )[0].grade
                                                }
                                            </td>
                                        ) : (
                                            <td>Not graded</td>
                                        )}
                                        {works.filter(
                                            (x) => x.homework.id === item.id
                                        ).length > 0 ? (
                                            <td>Already submitted</td>
                                        ) : (
                                            <td>
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        setHomework(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Homework link"></input>
                                                <button
                                                    className="btn btn-link"
                                                    onClick={(e) =>
                                                        submitHomework(
                                                            e,
                                                            item.id
                                                        )
                                                    }>
                                                    Submit homework
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SubjectHomeworks;
