"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApi = exports.MainRouter = void 0;
const express_1 = __importDefault(require("express"));
const Admin_Routes_1 = require("./Admin.Routes");
const Order_Routes_1 = require("./Order.Routes");
const Waiter_Routes_1 = require("./Waiter.Routes");
const Auth_Routes_1 = require("./Auth.Routes");
const Queue_Routes_1 = require("./Queue.Routes");
class MainRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.use('/product', Admin_Routes_1.AdminRoutesApi);
        this.router.use('/order', Order_Routes_1.OrderRoutesApi);
        this.router.use('/user', Waiter_Routes_1.UserRoutesApi);
        this.router.use('/auth', Auth_Routes_1.AuthRoutesApi);
        this.router.use('/queue', Queue_Routes_1.QueueRoutesApi);
    }
}
exports.MainRouter = MainRouter;
exports.MainApi = new MainRouter().router;
