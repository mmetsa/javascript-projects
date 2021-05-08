import { HttpClient } from "@aurelia/fetch-client";
import { BaseService } from "../../services/base-service";
import { IGasStation } from "../../domain/IGasStation";
import { AppState } from "../../state/app-state";

export class GasStationsIndex {
    
    private service: BaseService<IGasStation> = new BaseService<IGasStation>("https://localhost:5001/api/v1/gasstation", this.httpClient);

    private data: IGasStation[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState) {
    }

    async attached() {
        console.log("attatched");

        let response = await this.service.getAll()
        if (response.data) {
            this.data = response.data;
        }
    }

    isAdmin(): boolean {
        return this.state.roles.includes('Admin');
    }
}