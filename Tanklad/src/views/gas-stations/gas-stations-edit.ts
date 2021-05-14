import { HttpClient, IRouter, IRouteViewModel } from "aurelia";
import { IGasStation } from "../../domain/IGasStation";
import { IRetailer } from "../../domain/IRetailer";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class GasStationsEdit implements IRouteViewModel {
    //https://localhost:5001/api/v1/gasstation/id
    private service: BaseService<IGasStation> = new BaseService<IGasStation>("https://localhost:5001/api/v1/gasstation", this.httpClient, this.state.token);
    private retailerService: BaseService<IRetailer> = new BaseService<IRetailer>("https://localhost:5001/api/v1/retailer", this.httpClient, this.state.token);

    private data: IGasStation;
    private retailers: IRetailer[];
    private id: string;

    constructor(@IRouter private router: IRouter, protected httpClient: HttpClient, private state: AppState) {
    }

    async attached() {
        console.log("attatched");
    }

    async edit(event: Event) {
        event.preventDefault();
        let response = await this.service.edit(this.data.id, this.data)
        await this.router.load("/gas-stations-index");

    }

    async create(event: Event) {
        event.preventDefault();
        let response = await this.service.post(this.data)
        await this.router.load("/gas-stations-index");

    }

    async load(parameters) {
        console.log("load");
        this.id = parameters[0];
        let response = await this.retailerService.getAll()
        if (response.data) {
            this.retailers = response.data;
        }
        console.log(this.retailers);
        let newResponse = await this.service.get(parameters[0])
        if (newResponse.data) {
            console.log(newResponse.data);
            this.data = newResponse.data;
        }
    }

}