"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutesApi = exports.newUser = exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Order_controller_1 = require("../controller/Order.controller");
const auth = require('../middleware/auth');
const userauth = require('../middleware/Userauth');
const mixauth = require('../middleware/Mixauth');
const jwt = require("jsonwebtoken");
let newuser;
class OrderRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.post('/saveorder', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = req.body;
                const newOrder = yield new Order_controller_1.OrderController().saveorder(order);
                res.status(200).json({
                    message: newOrder
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.post('/getorder', mixauth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getreq = req.body;
                const admin = yield new Order_controller_1.OrderController().getorder(getreq);
                res.send(admin);
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.put('/updateorder', userauth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const upadated_admin = yield new Order_controller_1.OrderController().updateAdmin(product);
                const response = {
                    upadated_admin,
                };
                res.status(200).json({
                    message: response
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.delete('/deleteorder', userauth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const delreq = req.body;
                const Deleted_product = yield new Order_controller_1.OrderController().deleteOrder(delreq);
                res.status(200).json({
                    message: 'Product deleted'
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.post('/getorderlist', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newtoken = req.header('Authorization');
                const token = newtoken && newtoken.split(' ')[1];
                const decoded = jwt.verify(token, 'jwtPrivateKey');
                const user = decoded;
                newuser = user._id;
                let arr = [];
                // console.log(user._id);
                const adminList = yield new Order_controller_1.OrderController().getOrderlist();
                for (let i = 0; i < adminList.length; i++) {
                    // console.log(newuser==adminList[i].Waiter);
                    if (newuser == adminList[i].Waiter) {
                        arr.push(adminList[i]);
                    }
                }
                res.status(200).json({
                    result: arr
                });
            }
            catch (error) {
                next(error);
            }
        }));
    }
}
exports.OrderRoutes = OrderRoutes;
exports.newUser = newuser;
exports.OrderRoutesApi = new OrderRoutes().router;
