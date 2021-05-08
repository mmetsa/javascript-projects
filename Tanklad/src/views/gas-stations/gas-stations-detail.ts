import { HttpClient, IRouteViewModel } from "aurelia";
import { IGasStation } from "../../domain/IGasStation";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class GasStationsDetail implements IRouteViewModel {
    //https://localhost:5001/api/v1/gasstation/id
    private service: BaseService<IGasStation> = new BaseService<IGasStation>("https://localhost:5001/api/v1/gasstation", this.httpClient, this.state.token);

    private data: IGasStation;

    constructor(protected httpClient: HttpClient, private state: AppState) {
        
    }

    async attached() {
        console.log("attatched");
    }

    async load(parameters) {
        console.log("load");
        let response = await this.service.get(parameters[0])
        if (response.data) {
            console.log(response.data);
            this.data = response.data;
        }
    }

}