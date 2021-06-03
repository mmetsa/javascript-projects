import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppState";
import { BaseService } from "../../services/base-service";
import { IJwt } from "../../types/IJwt";
import { IMessages } from "../../types/IMessages";

interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile = () => {
    const appState = useContext(AppContext);

    const [errors, setErrors] = useState<string[] | undefined>();

    const [form, setForm] = useState<FormValues>({
        firstname: appState.firstName,
        lastname: appState.lastName,
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleForm = (e: any) => {
        setErrors([]);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        var result = await BaseService.post<IJwt | IMessages>(
            "/account/updateuser",
            {
                firstname: form.firstname,
                lastname: form.lastname,
                email: form.email,
                currentPassword: form.password,
                password:
                    form.newPassword.length !== 0
                        ? form.newPassword
                        : form.password,
            },
            appState.jwt ?? ""
        );

        if (result.ok && result.data) {
            let data = result.data as IJwt;
            appState.setAuthInfo(data.token, data.firstname, data.lastname);
            setErrors(["Successfully updated!"]);
        } else {
            setErrors(result.messages);
        }
    };

    return (
        <>
            <div className="row justify-content-center">
                <h1>Edit Profile</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="firstname">
                                <b>First name</b>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstname"
                                aria-describedby="firstnamehelp"
                                value={form.firstname}
                                onChange={(e) => handleForm(e)}
                                placeholder="Enter First name"
                            />
                            <small
                                id="firstnamehelp"
                                className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">
                                <b>Last name</b>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastname"
                                value={form.lastname}
                                onChange={(e) => handleForm(e)}
                                aria-describedby="lastnamehelp"
                                placeholder="Enter Last name"
                            />
                            <small
                                id="lastnamehelp"
                                className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                                <b>E-mail</b>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={(e) => handleForm(e)}
                                aria-describedby="emailHelp"
                                placeholder="Enter new E-mail address"
                            />
                            <small
                                id="emailHelp"
                                className="form-text text-muted"></small>
                        </div>
                        <button
                            onClick={() => handleSubmit()}
                            className="btn btn-primary">
                            Confirm
                        </button>
                    </div>
                    <div className="col-lg-4 col-md-4"></div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="password">
                                <b>Current Password</b>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={form.password}
                                onChange={(e) => handleForm(e)}
                                aria-describedby="passwordhelp"
                                placeholder="Enter current password"
                            />
                            <small
                                id="passwordhelp"
                                className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">
                                <b>New password</b>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={(e) => handleForm(e)}
                                aria-describedby="newPasswordHelp"
                                placeholder="Enter new password"
                            />
                            <small
                                id="newPasswordHelp"
                                className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatNewPassword">
                                <b>Repeat new password</b>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={(e) => handleForm(e)}
                                aria-describedby="repeatnewPasswordHelp"
                                placeholder="Repeat new password"
                            />
                            <small
                                id="repeatnewPasswordHelp"
                                className="form-text text-muted"></small>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <ul className="list-group">
                        {errors?.map((item, index) => {
                            return (
                                <li
                                    className="list-group-item list-group-item-danger"
                                    key={index}>
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Profile;
