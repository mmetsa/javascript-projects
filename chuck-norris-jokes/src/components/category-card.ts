import { bindable, IRouter } from "aurelia";

export class CategoryCard {
    @bindable private categoryName: string = "Celebrity";

    @bindable private viewName: string;

    constructor(@IRouter private router: IRouter) {

    }

    async loadView() {
        console.log(this.viewName);
        await this.router.load('/' + this.viewName);
    }
}