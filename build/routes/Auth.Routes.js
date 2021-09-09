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
exports.AuthRoutesApi = exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const config = require('config');
const jwt = require('jsonwebtoken');
const Auth_controller_1 = require("../controller/Auth.controller");
const bcrypt = require("bcrypt");
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.post("/getauth", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield new Auth_controller_1.AuthController().getauthuser(req.body);
                if (newUser) {
                    const valid = yield bcrypt.compare(req.body.password, newUser.password);
                    if (!valid)
                        return res.status(400).send("Invalid emails or password");
                }
                const token = jwt.sign({ _id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin, isWaiter: newUser.isWaiter }, 'jwtPrivateKey');
                res.header('x-auth-token', token);
                res.status(200).json({
                    message: newUser,
                });
            }
            catch (error) {
                next(error);
            }
        }));
    }
}
exports.AuthRoutes = AuthRoutes;
exports.AuthRoutesApi = new AuthRoutes().router;
