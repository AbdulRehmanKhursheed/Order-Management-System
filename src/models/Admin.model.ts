import { Schema, model } from "mongoose";
import { Food } from "../type/document/IAdmin";
import { Orders } from "../type/document/Order";
import { Waiter } from "../type/document/Waiter";
import { Queues } from "../type/document/Queues";
import mongoose from "mongoose";
const FoodSchema = new Schema(
  {
    food_itemname: { type: String },
    food_price: { type: String },
    food_type: { type: String },
    food_size:{ type: String },
  },
  { timestamps: true }
);
const OrderSchema = new Schema(
  {
    Customer_name:{type:String},
    Table_no:{type:String},
    Waiter:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "WaiterSchema",
    },
    Food: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodSchema",
      food_price:{type:Number},
    }],
    Order_status:{type:Number, default:0},
  },
  { timestamps: true }
);
const WaiterSchema = new Schema(
  {
    name:{
      type: String,
      required: true,
      minlength:5,
      maxlength:50

    },
    email:{
      type:String,
      required:true,
      minlength:5,
      maxlength:255,
      unique:true
    },
    password:{
      type:String,
      required:true,
      minlength:5,
      maxlength:1024
    },
    isAdmin:{
      type:Boolean,
      required:true,
      default:false,

    },
    isWaiter:{
      type:Boolean,
      required:true,
      
    }
    
  },
  { timestamps: true }
);
const TableSchema = new Schema(
  {
    Table_number:{
      type: Number,
      required: true,
    },
    
    
  },
  { timestamps: true }
);
export const WaitersSchema = model<Waiter>("WaiterSchema", WaiterSchema);
export const OrdersSchema = model<Orders>("OrderSchema", OrderSchema);
// export const Queue = model<Queues>("Queue", OrderSchema);
export const FoodsSchema = model<Food>("FoodSchema", FoodSchema);
