import React from "react";
import { IGasStation } from "../domain/IGasStation";

const GasStation = (gasStation: IGasStation) => {
    return (
        <>
            <div className="card h-100 gasstation-card">
                <div className="card-body row">
                    <div className="h-85 col-5">
                        <img
                            className="logo"
                            src="https://ehl.org.ee/wp-content/uploads/2018/10/Olerex-logo.jpg"
                            alt="Gas station logo"
                        />
                        <p className="card-text d-none d-sm-block">
                            <small className="text-muted">
                                Last updated: {new Date().getDate()}/
                                {new Date().getUTCMonth() + 1}/
                                {new Date().getFullYear()}
                            </small>
                        </p>
                    </div>
                    <div className="h-100 col-7">
                        <h5 className="row card-title justify-content-center">
                            <div className="row col-11 justify-content-center">
                                {gasStation.name}
                            </div>
                            <div className="row col-1">
                                <a
                                    title="Add as favorite"
                                    className="rounded-circle btn btn-primary btn-sm my-auto">
                                    +
                                </a>
                            </div>
                        </h5>
                        {/*Foreach fueltype starts*/}
                        <div className="row">
                            <p className="row card-text justify-content-end col-6">
                                <b>Diisel</b>
                            </p>
                            <p className="row card-text justify-content-end col-6">
                                <b>1.225 EUR</b>
                            </p>
                        </div>
                        {/*Foreach ends*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GasStation;
