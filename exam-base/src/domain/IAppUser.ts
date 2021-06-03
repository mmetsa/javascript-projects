import { IUserHomework } from "./IUserHomework";
import { IUserSubject } from "./IUserSubject";

export interface IAppUser {
    id: string;
    firstname: string;
    lastname: string;
    homeworks: IUserHomework[];
    subjects: IUserSubject[];
}
