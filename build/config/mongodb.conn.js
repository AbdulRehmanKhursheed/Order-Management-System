"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonStatConnection = exports.DbMongo = void 0;
const mongoose_1 = require("mongoose");
class DbMongo {
    constructor() {
    }
}
exports.DbMongo = DbMongo;
exports.MonStatConnection = mongoose_1.connection.readyState;
