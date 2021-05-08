import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityRegister {
    
    private service: AccountService = new AccountService("https://localhost:5001/api/v1/Account/register", this.httpClient);

    private email: string;
    private password: string;
    private firstname: string;
    private lastname: string;
    constructor(@IRouter private router: IRouter, protected httpClient: HttpClient, private state: AppState) {
    }

    async registerClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        let response = await this.service.register(this.email, this.password, this.firstname, this.lastname);

        if (response.statusCode === 200 && response.data) {
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;
            this.state.getRoles();

            await this.router.load('/home-index.html');
        }
    }

}