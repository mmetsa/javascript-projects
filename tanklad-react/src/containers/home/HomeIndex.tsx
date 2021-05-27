import React, { useEffect, useState } from "react";
import { IRetailer } from "../../domain/IRetailer";
import { BaseService } from "../../services/base-service";

const HomeIndex = () => {
    const [retailers, setRetailers] = useState([] as IRetailer[]);
    const loadData = async () => {
        let retailersResponse = await BaseService.getAll<IRetailer>(
            "/retailer",
            ""
        );
        if (retailersResponse.ok && retailersResponse.data) {
            setRetailers(retailersResponse.data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Welcome to the Estonian gas stations web page!</h1>
                <h3>Find gas station information for these retailers</h3>
            </div>
            <div className="row mt-5">
                {retailers.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="col-sm-12 col-md-6 col-lg-4 align-items-center">
                            <img
                                src={item.logoUrl ?? ""}
                                alt="Logo"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default HomeIndex;
