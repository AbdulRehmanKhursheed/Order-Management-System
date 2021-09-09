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
exports.UserRoutesApi = exports.WaiterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth = require('../middleware/auth');
const userauth = require('../middleware/Userauth');
const User_controller_1 = require("../controller/User.controller");
const bcrypt = require('bcrypt');
class WaiterRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.post('/savewaiter', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const salt = yield bcrypt.genSalt(10);
                user.password = yield bcrypt.hash(user.password, salt);
                const newUser = yield new User_controller_1.UserController().savewaiter(user);
                res.status(200).json({
                    message: newUser
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.post('/getbill', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getreq = req.body;
                const admin = yield new User_controller_1.UserController().getorder(getreq);
                console.log(admin);
                res.json({
                    "Bill": admin,
                });
            }
            catch (error) {
                next(error);
            }
        }));
    }
}
exports.WaiterRoutes = WaiterRoutes;
exports.UserRoutesApi = new WaiterRoutes().router;
