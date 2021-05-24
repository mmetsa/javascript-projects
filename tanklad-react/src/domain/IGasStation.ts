import { IContact } from "./IContact";
import { IFuelType } from "./IFuelType";
import { IRetailer } from "./IRetailer";
import { IService } from "./IService";

export interface IGasStation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    openHours: string;
    retailerId: string;
    retailer: IRetailer;
    fuelTypes: IFuelType[];
    contacts: IContact[];
    services: IService[];
}
