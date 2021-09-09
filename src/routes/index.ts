import express from 'express';
import { AdminRoutesApi } from "./Admin.Routes";
import { OrderRoutesApi } from "./Order.Routes";
import { UserRoutesApi } from "./Waiter.Routes";
import { AuthRoutesApi } from "./Auth.Routes";
import { QueueRoutesApi } from "./Queue.Routes";
export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.use('/product',AdminRoutesApi);
        this.router.use('/order',OrderRoutesApi);
        this.router.use('/user',UserRoutesApi);
        this.router.use('/auth',AuthRoutesApi);
        this.router.use('/queue',QueueRoutesApi);
    }


}
export const MainApi = new MainRouter().router;