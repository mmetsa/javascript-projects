import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IQueryParams } from "../types/IQueryParams";

export class BaseService<TEntity> {

    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private jwt?: string) {
        // url: https://xxx.xxx.xx/api/v1/GasStation
    }

    private authHeaders = this.jwt !== undefined ? {
        'Authorization': 'Bearer ' + (this.jwt)
    } 
    : 
    {

    };

    async getAll(queryParameters?: IQueryParams, ) : Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        if(queryParameters !== undefined) {
            // TODO: add Query params to url
        }

        try {
            const response = await this.httpClient.fetch(
                url, 
                {
                    cache: "no-store",
                    headers: this.authHeaders
                });
            if (response.ok) {
                const data = (await response.json()) as TEntity[];
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async get(id: string, queryParameters?: IQueryParams, ) : Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + "/" + id;
        if(queryParameters !== undefined) {
            // TODO: add Query params to url
        }

        try {
            const response = await this.httpClient.fetch(
                url, 
                {
                    cache: "no-store",
                     headers: this.authHeaders
                });
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async edit(id: string, body: any, queryParameters?: IQueryParams) : Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + "/" + id;
        if(queryParameters !== undefined) {
            // TODO: add Query params to url
        }

        try {
            const response = await this.httpClient.put(
                url, 
                JSON.stringify(body),
                {
                    cache: "no-store",
                     headers: this.authHeaders
                });
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async delete(id: string, body?: any, queryParameters?: IQueryParams) : Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + "/" + id;
        if(queryParameters !== undefined) {
            // TODO: add Query params to url
        }

        try {
            const response = await this.httpClient.delete(
                url,
                JSON.stringify(body),
                {
                    cache: "no-store",
                     headers: this.authHeaders
                });
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async post(body?: any, queryParameters?: IQueryParams) : Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        if(queryParameters !== undefined) {
            // TODO: add Query params to url
        }

        try {
            const response = await this.httpClient.post(
                url,
                JSON.stringify(body),
                {
                    cache: "no-store",
                     headers: this.authHeaders
                });
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }
}