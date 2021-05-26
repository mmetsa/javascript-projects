import React from "react";
import { useHistory } from "react-router-dom";
import { IGasStation } from "../../domain/IGasStation";

const GasStationDetails = () => {
    const history = useHistory();
    let gasStation: IGasStation = history.location.state as IGasStation;
    return (
        <>
            <h1>Gas Station details</h1>

            <div>
                <hr />
                <div className="row">
                    <dl className="col-sm-12 col-md-6 col-3">
                        <dt className="col-sm-2">Name</dt>
                        <dd className="col-sm-10">{gasStation.name}</dd>
                        <dt className="col-sm-2">Address</dt>
                        <dd className="col-sm-10">{gasStation.address}</dd>
                        <dt className="col-sm-2">Open hours</dt>
                        <dd className="col-sm-10">{gasStation.openHours}</dd>
                        <dt className="col-sm-2">Retailer</dt>
                        <dd className="col-sm-10">
                            {gasStation.retailer.name}
                        </dd>
                    </dl>
                    <div className="col-sm-12 col-md-6 col-3">
                        {gasStation.fuelTypes && (
                            <table className="table table-striped">
                                <thead className="table table-primary">
                                    <tr>
                                        <td>Fuel Type</td>
                                        <td>Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gasStation.fuelTypes.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.fuelType.name}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="col-sm-12 col-md-6 col-3">
                        {gasStation.contacts && (
                            <table className="table table-striped">
                                <thead className="table table-primary">
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            Contacts
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gasStation.contacts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.contactType.name}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="col-sm-12 col-md-6 col-3">
                        {gasStation.services && (
                            <table className="table table-striped">
                                <thead className="table table-primary">
                                    <tr>
                                        <td className="text-center">
                                            Services
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gasStation.services.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {item.service.name}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <button
                    onClick={() => history.goBack()}
                    className="btn btn-lg btn-primary">
                    Go Back
                </button>
            </div>
        </>
    );
};

export default GasStationDetails;
