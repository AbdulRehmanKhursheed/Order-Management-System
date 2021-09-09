"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainOrder = void 0;
const Admin_model_1 = require("../models/Admin.model");
class MainOrder {
    constructor() { }
    getOrder(_id) {
        return Admin_model_1.OrdersSchema.findById(_id).populate('Food', 'food_itemname food_size food_price');
    }
    saveOrder(ORDer) {
        const queue = new Admin_model_1.Queue(ORDer).save();
        return new Admin_model_1.OrdersSchema(ORDer).save();
    }
    updateOrder(Admmin) {
        return Admin_model_1.OrdersSchema.findByIdAndUpdate(Admmin._id, Admmin, {
            new: true
        });
    }
    deleteOrder(_id) {
        return Admin_model_1.OrdersSchema.findByIdAndDelete(_id);
    }
    getOrderList() {
        return Admin_model_1.OrdersSchema.find().populate('Food', 'food_itemname food_price ood_size');
    }
}
exports.MainOrder = MainOrder;
