import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import Header from "./components/Header";
import Login from "./containers/account/Login";
import Profile from "./containers/account/Profile";
import Register from "./containers/account/Register";
import Homeworks from "./containers/admin/Homeworks";
import HomeIndex from "./containers/home/HomeIndex";
import Subjects from "./containers/Subjects";
import StudentSubjects from "./containers/student/Subjects";
import { AppContextProvider, initialState } from "./context/AppState";
import TeacherSubjects from "./containers/teacher/Subjects";
import Footer from "./components/Footer";
import PageNotFound from "./containers/Page404";
import SubjectHomeworks from "./containers/student/SubjectHomeworks";
import TeacherSubjectDetails from "./containers/teacher/TeacherSubjectDetails";
import TeacherSubjectsCreate from "./containers/teacher/TeacherSubjectsCreate";
import TeacherAddHomework from "./containers/teacher/TeacherAddHomework";
import TeacherShowHomeworks from "./containers/teacher/TeacherShowHomeworks";

function App() {
    const setAuthInfo = (
        jwt: string | null,
        firstName: string,
        lastName: string
    ): void => {
        let user: any = "";
        let role: string | null = null;
        if (jwt) {
            user = jwtDecode(jwt ?? "");
            role =
                user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] ?? null;
        }
        setAppState({
            ...appState,
            jwt,
            firstName,
            lastName,
            role: role,
        });
    };

    const setRoles = (role: string | null) => {
        setAppState({ ...appState, role });
    };

    const [appState, setAppState] = useState({
        ...initialState,
        setAuthInfo,
        setRoles,
    });

    return (
        <>
            <div className="App">
                <AppContextProvider value={appState}>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={HomeIndex}></Route>
                        <Route path="/account/login" component={Login} />
                        <Route path="/account/register" component={Register} />
                        <Route path="/account" component={Profile} />
                        <Route path="/admin/homeworks" component={Homeworks} />
                        <Route
                            path="/student/subjects/:id/homeworks"
                            component={SubjectHomeworks}
                        />
                        <Route path="/subjects" component={Subjects} />
                        <Route
                            exact
                            path="/teacher/subjects/create"
                            component={TeacherSubjectsCreate}
                        />
                        <Route
                            path="/teacher/subjects/:id/homeworks"
                            component={TeacherShowHomeworks}
                        />
                        <Route
                            path="/teacher/subjects/:id/homework"
                            component={TeacherAddHomework}
                        />
                        <Route
                            path="/teacher/subjects/:id"
                            component={TeacherSubjectDetails}
                        />
                        <Route
                            path="/teacher/subjects"
                            component={TeacherSubjects}
                        />

                        <Route
                            path="/student/subjects"
                            component={StudentSubjects}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer />
                </AppContextProvider>
            </div>
        </>
    );
}

export default App;
