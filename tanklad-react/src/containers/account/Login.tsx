import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppState";
import { BaseService } from "../../services/base-service";
import { IJwt } from "../../types/IJwt";
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const appState = useContext(AppContext);

    const [form, setValues] = useState({
        email: "",
        password: "",
    });
    let errors = null as string[] | null;
    const [errorMessages, setErrors] = useState(errors);

    const postData = async (e: any) => {
        e.preventDefault();

        if (form.email === "" || form.password.length < 6) {
            setErrors([
                "Email can't be empty!",
                "Password must be at least 6 characters!",
            ]);
            return;
        }

        let result = await BaseService.post<IJwt>("/account/login", form);
        if (result.ok && result.data) {
            appState.setAuthInfo(
                result.data.token,
                result.data.firstname,
                result.data.lastname
            );
            history.replace("/");
        } else {
            setErrors(result.messages ?? ["Server is not responding..."]);
            console.log(result.messages);
        }
    };
    return (
        <>
            <h1 className="row justify-content-center mb-5">
                Use your account to log in
            </h1>
            <div className="row justify-content-center">
                <form className="col-4" onSubmit={(e) => postData(e)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={form.email}
                            onChange={(e) => {
                                setValues({
                                    ...form,
                                    email: e.target.value,
                                });
                                setErrors(null);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={form.password}
                            onChange={(e) => {
                                setValues({
                                    ...form,
                                    password: e.target.value,
                                });
                                setErrors(null);
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">
                        Log in
                    </button>
                    {errorMessages
                        ? errorMessages.map((msg, index) => (
                              <div
                                  key={index}
                                  className="alert alert-danger"
                                  role="alert">
                                  {msg}
                              </div>
                          ))
                        : null}
                </form>
            </div>
        </>
    );
};

export default Login;
