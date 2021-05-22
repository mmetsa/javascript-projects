import { IFuelType } from "./IFuelType";

export interface IGasStation {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    address?: string;
    openhours?: string;
    retailerId: string;
    fuelTypes: IFuelType[];
}
