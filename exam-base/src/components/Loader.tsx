import React from "react";
import { EPageStatus } from "../types/EPageStatus";

const Loader = (props: { pageStatus: string; statusCode: number }) => {
    if (props.pageStatus === EPageStatus.Loading) {
        return <div>Loading...</div>;
    }
    if (props.pageStatus === EPageStatus.Error) {
        return <div>Error... Status code: {props.statusCode}</div>;
    }
    return null;
};

export default Loader;
