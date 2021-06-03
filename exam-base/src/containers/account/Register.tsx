import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppState";
import { BaseService } from "../../services/base-service";
import { IJwt } from "../../types/IJwt";
import { useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const appState = useContext(AppContext);

    const [form, setValues] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
    });
    let errors = null as string[] | null;
    const [errorMessages, setErrors] = useState(errors);
    const [confirmPwd, setConfirmPwd] = useState("");

    const postData = async (e: any) => {
        e.preventDefault();
        if (form.password !== confirmPwd) {
            setErrors(["Passwords do not match"]);
            return;
        }
        let result = await BaseService.post<IJwt>("/account/register", form);
        if (result.ok && result.data) {
            console.log(result.data);
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
                Register a new account
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
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={form.firstname}
                            onChange={(e) => {
                                setValues({
                                    ...form,
                                    firstname: e.target.value,
                                });
                                setErrors(null);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={form.lastname}
                            onChange={(e) => {
                                setValues({
                                    ...form,
                                    lastname: e.target.value,
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
                    <div className="form-group">
                        <label htmlFor="confirmPwd">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPwd"
                            value={confirmPwd}
                            onChange={(e) => {
                                setConfirmPwd(e.target.value);
                                setErrors(null);
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">
                        Register
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

export default Register;
