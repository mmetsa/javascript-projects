import { IRetailer } from "./IRetailer";

export interface IGasStation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    openHours: string;
    retailerId: string;
    retailer: IRetailer;
}
