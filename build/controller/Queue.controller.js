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
exports.QueueController = void 0;
const Queue_repositorie_1 = require("../repositories/Queue.repositorie");
const error_1 = __importDefault(require("../utills/error"));
const tsoa_1 = require("tsoa");
let QueueController = class QueueController {
    constructor() { }
    //   @Post("/saveorder")
    //   async saveorder(@Body() order: SaveReqOrder): Promise<SaveUpdateResOrder> {
    //     const new_product: Orders = await new MainOrder().saveOrder(<Orders>order);
    //     return <SaveUpdateResOrder>new_product;
    //   }
    getorder(getreq) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield new Queue_repositorie_1.MainOrder().getOrderQueue(getreq.id);
            if (admin === null)
                throw new error_1.default(404, "Order not found");
            return admin;
        });
    }
    updateAdmin(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const update_product = yield new Queue_repositorie_1.MainOrder().updateOrder(order);
            if (update_product === null)
                throw new error_1.default(400, "Order not updated");
            return update_product;
        });
    }
    deleteOrder(delreq) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Queue_repositorie_1.MainOrder().deleteOrder(delreq.id);
        });
    }
    getOrderlist() {
        return __awaiter(this, void 0, void 0, function* () {
            //  console.log(newuser);
            const orders = yield new Queue_repositorie_1.MainOrder().getOrderList();
            // let sum = 0;
            // for (let index = 0; index < orders.length; index++) {
            //   console.log(orders[index].Waiter._id);
            // }
            return orders;
        });
    }
};
__decorate([
    tsoa_1.Post("/getiteminqueue"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getorder", null);
__decorate([
    tsoa_1.Put("/updateorder"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "updateAdmin", null);
__decorate([
    tsoa_1.Delete("/deleteorder"),
    tsoa_1.SuccessResponse("200", "Product deleted"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "deleteOrder", null);
__decorate([
    tsoa_1.Post("/getorderlist"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getOrderlist", null);
QueueController = __decorate([
    tsoa_1.Route("queue"),
    tsoa_1.Tags("Queue"),
    tsoa_1.Security("api_key"),
    __metadata("design:paramtypes", [])
], QueueController);
exports.QueueController = QueueController;
