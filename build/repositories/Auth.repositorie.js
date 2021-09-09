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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAuth = void 0;
const Admin_model_1 = require("../models/Admin.model");
class MainAuth {
    constructor() { }
    //   getAdmin(_id: string) {
    //     return ProductsSchema.findById(_id);
    //   }
    getAuth(Userr) {
        return __awaiter(this, void 0, void 0, function* () {
            // let user= await UsersSchema.findOne({ email:Userr.email});
            // if(user) return Userr;
            return Admin_model_1.WaitersSchema.findOne({ email: Userr.email });
            // return new UsersSchema(Userr).findOne();
        });
    }
}
exports.MainAuth = MainAuth;
