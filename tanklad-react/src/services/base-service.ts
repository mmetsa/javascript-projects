import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiBaseUrl } from "../configuration";
import { IFetchResponse } from "../types/IFetchResponse";
import { IMessages } from "../types/IMessages";

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            "Content-Type": "application/json",
        },
    });

    protected static getAxiosConfiguration(
        jwt?: string
    ): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: "Bearer " + jwt,
            },
        };
        return config;
    }

    static async getAll<TEntity>(
        apiEndpoint: string,
        jwt?: string
    ): Promise<IFetchResponse<TEntity[]>> {
        try {
            let response = await this.axios.get<TEntity[]>(
                apiEndpoint,
                BaseService.getAxiosConfiguration()
            );
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data,
            };
        } catch (error) {
            let err = error as AxiosError;
            return {
                ok: false,
                statusCode: err.response?.status ?? 500,
                messages: (err.response?.data as IMessages).messages,
            };
        }
    }
}
