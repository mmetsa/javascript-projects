import { IContact } from "./IContact";
import { IFuelTypeInGasStation } from "./IFuelTypeInGasStation";
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
    fuelTypes: IFuelTypeInGasStation[];
    contacts: IContact[];
    services: IService[];
}
