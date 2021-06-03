import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppState";
import { IHomework } from "../../domain/IHomework";
import { ISubject } from "../../domain/ISubject";
import { IUserHomework } from "../../domain/IUserHomework";
import { BaseService } from "../../services/base-service";
import { IMessages } from "../../types/IMessages";

const TeacherAddHomework = () => {
    const { id } = useParams() as { id: string };

    const [homeworks, setHomeworks] = useState<IUserHomework[]>([]);
    const appState = useContext(AppContext);
    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState<Date>(new Date());
    const [subjects, setSubjects] = useState<ISubject[]>();
    const [selectedSub, setSelectedSub] = useState("");

    const loadData = async () => {
        let response = await BaseService.getAll<ISubject>(
            "/subjects",
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            let subs = response.data.filter(
                (x) =>
                    x.teacherName ===
                    appState.firstName + " " + appState.lastName
            );
            setSubjects(subs);
        }
    };

    const onCreate = async () => {
        let obj = {
            name: name,
            description: description,
            deadline,
            subjectId: selectedSub,
        };
        console.log(obj);

        let response = await BaseService.post<IMessages>(
            "/subjects/" + id + "/homeworks/add",
            obj,
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            history.push("/teacher/subjects/" + id);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Add a new Homework</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <input
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <input
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Deadline</label>
                        <input
                            type="date"
                            onChange={(e) =>
                                setDeadline(e.target.valueAsDate ?? new Date())
                            }
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Subject</label>
                    </div>
                    <div className="form-group">
                        <select
                            onChange={(e) => setSelectedSub(e.target.value)}>
                            {subjects?.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            onClick={() => onCreate()}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherAddHomework;
