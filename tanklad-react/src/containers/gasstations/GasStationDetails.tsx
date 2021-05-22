import React from "react";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const GasStationDetails = () => {
    let { id } = useParams() as IRouteId;
    return <h1>Gas Station details {id}</h1>;
};

export default GasStationDetails;
