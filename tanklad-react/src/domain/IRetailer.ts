import { ICustomerCard } from "./ICustomerCard";

export interface IRetailer {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    customerCards: ICustomerCard[] | null;
    contactsCount: number;
    favoritesCount: number;
    gasStationsCount: number;
}
