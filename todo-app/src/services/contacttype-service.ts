import { HttpClient } from "@aurelia/fetch-client";
import { inject } from "@aurelia/kernel";
import { IContactType } from "../domain/IContactType";

@inject()
export class ContacttypeService {
    constructor(private httpClient: HttpClient) {
        
    }

    async getAll(): Promise<IContactType[]> {
        var response = await this.httpClient.get('https://localhost:5001/api/contacttypes', {cache: "no-store"});
        console.log(response);
        if(response.ok) {
            const data = (await response.json()) as IContactType[];
            return data;
        }
        return [];
    }
}