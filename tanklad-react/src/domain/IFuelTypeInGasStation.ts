import { IFuelType } from "./IFuelType";

export interface IFuelTypeInGasStation {
    price: number;
    fuelTypeId: string;
    fuelType: IFuelType;
    id: string;
}
