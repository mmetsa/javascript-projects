import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { IGasStation } from "../../domain/IGasStation";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const GasStationsIndex = () => {
    const [contactTypes, setContactTypes] = useState([] as IGasStation[]);
    const [pageStatus, setPageStatus] = useState({
        pageStatus: EPageStatus.Loading,
        statusCode: -1,
    });

    const loadData = async () => {
        let result = await BaseService.getAll<IGasStation>("/GasStation");
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setContactTypes(result.data);
            console.log(result.data);
        } else {
            setPageStatus({
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode,
            });
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <h1>Gas Stations index</h1>
            <Loader {...pageStatus} />
        </>
    );
};

export default GasStationsIndex;
