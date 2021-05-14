import { HttpClient, IRouter, IRouteViewModel } from "aurelia";
import { IGasStation } from "../../domain/IGasStation";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class GasStationsDetail implements IRouteViewModel {
    //https://localhost:5001/api/v1/gasstation/id
    private service: BaseService<IGasStation> = new BaseService<IGasStation>("https://localhost:5001/api/v1/gasstation", this.httpClient, this.state.token);

    private data: IGasStation;
    private isDelete: boolean;

    constructor(@IRouter private router: IRouter, protected httpClient: HttpClient, private state: AppState) {
        
    }

    async attached() {
        console.log("attatched");
    }

    async load(parameters) {
        console.log("load");
        if (parameters[1] == 'true') {
            this.isDelete = true;
        }
        let response = await this.service.get(parameters[0])
        if (response.data) {
            console.log(response.data);
            this.data = response.data;
        }
    }

    async delete() {
        event.preventDefault();
        let response = await this.service.delete(this.data.id)
        await this.router.load("/gas-stations-index");
    }
}