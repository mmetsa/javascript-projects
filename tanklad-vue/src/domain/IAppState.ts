import { IGasStation } from "./IGasStation";
import { IRetailer } from "./IRetailer";

export interface IAppState {
    token: string | null;
    firstname: string;
    lastname: string;
    gasstations: IGasStation[];
    retailers: IRetailer[];
    favorites: IGasStation[];
}
