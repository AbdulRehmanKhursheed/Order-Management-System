"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainOrder = void 0;
const Admin_model_1 = require("../models/Admin.model");
class MainOrder {
    constructor() { }
    getOrderQueue(_id) {
        return Admin_model_1.Queue.findById(_id).populate('Food', 'food_itemname food_size food_price').limit(1);
    }
    //   saveOrder(ORDer: Orders) {
    //     const queue =new Queue(ORDer).save();
    //     return new OrdersSchema(ORDer).save();
    //   }
    updateOrder(Admmin) {
        return Admin_model_1.Queue.findByIdAndUpdate({ _id: Admmin._id }, {
            $set: { Order_status: 1 }
        }, { new: true });
    }
    deleteOrder(_id) {
        return Admin_model_1.Queue.findByIdAndDelete(_id);
    }
    getOrderList() {
        return Admin_model_1.Queue.find().populate('Food', 'food_itemname food_price ood_size');
    }
}
exports.MainOrder = MainOrder;
