import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IJwt } from "../types/IJwt";
import { IMessage } from "../types/IMessage";

export class AccountService {


    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient) {
        // url: https://xxx.xxx.xx/api/v1/GasStation
    }

    async login(email: string, password: string) : Promise<IFetchResponse<IJwt | IMessage>> {
        let url = this.apiEndpointUrl;

        try {
            let body = {email, password};
            const response = await this.httpClient.post(url, JSON.stringify(body), {cache: "no-store"})
            if (response.ok) {
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            const data = (await response.json()) as IMessage;
            return {
                statusCode: response.status,
                errorMessage: response.statusText + " " + data.messages.join(" ")
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    
    async register(email: string, password: string, firstname: string, lastname: string) : Promise<IFetchResponse<IJwt | IMessage>> {
        let url = this.apiEndpointUrl;

        try {
            let body = {email, password, firstname, lastname};
            const response = await this.httpClient.post(url, JSON.stringify(body), {cache: "no-store"})
            if (response.ok) {
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            const data = (await response.json()) as IMessage;
            return {
                statusCode: response.status,
                errorMessage: response.statusText + " " + data.messages.join(" ")
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }
}