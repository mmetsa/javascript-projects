import jwt_decode from 'jwt-decode';

export class AppState {

    token: string | null = null;
    firstname: string = "";
    lastname: string = "";
    roles: string[] = []
    
    constructor() {

    }

    getRoles() {
        var decoded = jwt_decode(this.token);
        this.roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

}