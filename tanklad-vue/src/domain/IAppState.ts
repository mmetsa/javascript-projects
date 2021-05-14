import { IGasStation } from "./IGasStation";

export interface IAppState {
    token: string | null;
    firstname: string;
    lastname: string;
    gasstations: IGasStation[];
}