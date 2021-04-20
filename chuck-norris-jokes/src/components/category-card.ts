import { bindable, IRouter } from "aurelia";

export class CategoryCard {
    @bindable private categoryName: string = "Celebrity";

    @bindable private viewName: string;

    constructor() {

    }
}