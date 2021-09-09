"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const User_repositorie_1 = require("../repositories/User.repositorie");
const error_1 = __importDefault(require("../utills/error"));
const Order_repositorie_1 = require("../repositories/Order.repositorie");
const tsoa_1 = require("tsoa");
const Admin_model_1 = require("../models/Admin.model");
let UserController = class UserController {
    constructor() { }
    savewaiter(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_product = yield new User_repositorie_1.MainUser().saveWaiter((user));
            return (new_product);
        });
    }
    getorder(getreq) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield new Order_repositorie_1.MainOrder().getOrder(getreq.id);
            let sum = 0;
            for (let index = 0; index < admin.Food.length; index++) {
                const ids = admin.Food[index];
                let fooditems = yield Admin_model_1.FoodsSchema.findById(ids);
                console.log(fooditems.food_price);
                let price = +fooditems.food_price;
                sum += price;
                console.log("Total bill: " + sum);
            }
            if (admin === null)
                throw new error_1.default(404, "Order not found");
            return sum;
        });
    }
};
__decorate([
    tsoa_1.Post('/savewaiter'),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "savewaiter", null);
__decorate([
    tsoa_1.Post('/getbill'),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getorder", null);
UserController = __decorate([
    tsoa_1.Route('user'),
    tsoa_1.Tags('user'),
    tsoa_1.Security('api_key'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
