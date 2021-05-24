import React, { useEffect, useState } from "react";
import GasStation from "../../components/GasStation";
import Loader from "../../components/Loader";
import { IGasStation } from "../../domain/IGasStation";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const GasStationsIndex = () => {
    const [gasStations, setGasStations] = useState([] as IGasStation[]);
    const [pageStatus, setPageStatus] = useState({
        pageStatus: EPageStatus.Loading,
        statusCode: -1,
    });

    const loadData = async () => {
        let result = await BaseService.getAll<IGasStation>("/GasStation");
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setGasStations(result.data);
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
            <h1 className="mb-5">Gas Stations</h1>
            <div>
                <div className="row justify-content-around">
                    {gasStations.map((item, key) => {
                        return (
                            <div
                                className="col-sm-12 col-md-12 col-lg-6 pb-3 gasstation-parent"
                                key={key}>
                                <GasStation {...item} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <Loader {...pageStatus} />
        </>
    );
};

export default GasStationsIndex;
