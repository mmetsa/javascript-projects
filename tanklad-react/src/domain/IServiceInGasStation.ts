import { IService } from "./IService";

export interface IServiceInGasStation {
    id: string;
    gasStationId: string;
    service: IService;
}
