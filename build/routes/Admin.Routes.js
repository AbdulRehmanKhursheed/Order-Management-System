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
exports.AdminRoutesApi = exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Admin_controller_1 = require("../controller/Admin.controller");
const auth = require('../middleware/auth');
const userauth = require('../middleware/Userauth');
const mixauth = require('../middleware/Mixauth');
class AdminRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.post('/savefooditem', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const newProduct = yield new Admin_controller_1.AdminController().saveadmin(product);
                res.status(200).json({
                    message: newProduct
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.post('/getfooditem', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getreq = req.body;
                const admin = yield new Admin_controller_1.AdminController().getadmin(getreq);
                res.send(admin);
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.put('/updatefooditem', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const upadated_admin = yield new Admin_controller_1.AdminController().updateAdmin(product);
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
        this.router.delete('/deletefooditem', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const delreq = req.body;
                const Deleted_product = yield new Admin_controller_1.AdminController().deletadmin(delreq);
                res.status(200).json({
                    message: 'Product deleted'
                });
            }
            catch (error) {
                next(error);
            }
        }));
        this.router.post('/getfoodmenu', mixauth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const adminList = yield new Admin_controller_1.AdminController().getadminList();
                res.status(200).json({
                    result: adminList
                });
            }
            catch (error) {
                next(error);
            }
        }));
    }
}
exports.AdminRoutes = AdminRoutes;
exports.AdminRoutesApi = new AdminRoutes().router;
