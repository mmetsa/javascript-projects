import React, { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import { AppContext } from "../context/AppState";
import { ISubject } from "../domain/ISubject";
import { IUserSubject } from "../domain/IUserSubject";
import { BaseService } from "../services/base-service";

const Subjects = () => {
    const [subjects, setSubjects] = useState<ISubject[]>();
    const [shownSubjects, setShownSubjects] = useState<ISubject[]>();
    const [userSubjects, setUserSubjects] = useState<IUserSubject[]>();
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<ISubject>(
            "/subjects",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setSubjects(result.data);
            setShownSubjects(result.data);
        }

        let res = await BaseService.getAll<IUserSubject>(
            "/subjects/student",
            appState.jwt ?? ""
        );

        if (res.ok && res.data) {
            setUserSubjects(res.data);
            console.log(res.data);
        }
    };

    const refresh = () => {
        loadData();
    };

    const onSearch = (e: any) => {
        setShownSubjects(
            subjects?.filter((x) =>
                x.name.toLowerCase().includes(e.target.value)
            )
        );
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Our courses</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-6 col-sm-12">
                    <Search {...{ onChange: onSearch }} />
                </div>
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
                        {shownSubjects?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.teacherName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.credit}</td>
                                    {appState.jwt && (
                                        <td>
                                            <Action
                                                {...{
                                                    userSubjects,
                                                    item,
                                                    refresh,
                                                }}
                                            />
                                        </td>
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

const Action = (props: {
    userSubjects: IUserSubject[] | undefined;
    item: ISubject;
    refresh: Function;
}) => {
    const appState = useContext(AppContext);
    const enroll = async (e: any) => {
        let response = await BaseService.post(
            "/subjects/student/enroll",
            props.item,
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            props.refresh();
        }
    };

    if (
        props.userSubjects &&
        props.userSubjects.filter((x) => x.subjectId === props.item.id).length >
            0
    ) {
        let subject = props.userSubjects.filter(
            (x) => x.subjectId === props.item.id
        )[0];
        if (subject.status === 0) {
            return <>Pending</>;
        } else if (subject.status === 2) {
            return <>Denied</>;
        }
        return <>Enrolled</>;
    }
    return (
        <>
            <button className="btn btn-link" onClick={(e) => enroll(e)}>
                Enroll
            </button>
        </>
    );
};

export default Subjects;
