import { IAppUser } from "./IAppUser";
import { IHomework } from "./IHomework";

export interface IUserHomework {
    appUser: IAppUser;
    grade: number;
    work: string;
    homework: IHomework;
    homeworkId: string;
}
