"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAdmin = void 0;
const Admin_model_1 = require("../models/Admin.model");
class MainAdmin {
    constructor() { }
    getAdmin(_id) {
        return Admin_model_1.FoodsSchema.findById(_id);
    }
    saveAdmin(ADMin) {
        return new Admin_model_1.FoodsSchema(ADMin).save();
    }
    updateAdmin(Admmin) {
        return Admin_model_1.FoodsSchema.findByIdAndUpdate(Admmin._id, Admmin, {
            new: true
        });
    }
    deletAdmin(_id) {
        return Admin_model_1.FoodsSchema.findByIdAndDelete(_id);
    }
    getAdminslist() {
        return Admin_model_1.FoodsSchema.find();
    }
}
exports.MainAdmin = MainAdmin;
