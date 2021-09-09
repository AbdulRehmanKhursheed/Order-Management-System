"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodsSchema = exports.Queue = exports.OrdersSchema = exports.WaitersSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const FoodSchema = new mongoose_1.Schema({
    food_itemname: { type: String },
    food_price: { type: String },
    food_type: { type: String },
    food_size: { type: String },
}, { timestamps: true });
const OrderSchema = new mongoose_1.Schema({
    Customer_name: { type: String },
    Table_no: { type: String },
    Waiter: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "WaiterSchema",
    },
    Food: [{
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: "FoodSchema",
            food_price: { type: Number },
        }],
    Order_status: { type: Number },
}, { timestamps: true });
const WaiterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isWaiter: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });
const TableSchema = new mongoose_1.Schema({
    Table_number: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.WaitersSchema = mongoose_1.model("WaiterSchema", WaiterSchema);
exports.OrdersSchema = mongoose_1.model("OrderSchema", OrderSchema);
exports.Queue = mongoose_1.model("Queue", OrderSchema);
exports.FoodsSchema = mongoose_1.model("FoodSchema", FoodSchema);
