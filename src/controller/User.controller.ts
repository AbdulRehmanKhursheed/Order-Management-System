import { Waiter } from '../type/document/Waiter';
import { MainUser} from '../repositories/User.repositorie';
import CustomeError from '../utills/error';
import { MainOrder } from "../repositories/Order.repositorie";
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse ,Security} from "tsoa";
import { SaveUpdateResFood } from '../type/responses/Admin.response';
import { getReqWaiter,SaveReqWaiter } from '../type/request/User.request';
import { SaveUpdateResOrder } from "../type/responses/Order.response";
import {
  deleteorder,
  GetOrder,
  SaveReqOrder,
  UpdateReqOrder,
  SearchReqOrder,
} from "../type/request/Order.request";
import { FoodsSchema } from "../models/Admin.model";
@Route('user')
@Tags('user')
@Security('api_key')
export class UserController {
  constructor() { }
  @Post('/savewaiter')
  async savewaiter(@Body() user: SaveReqWaiter): Promise<SaveReqWaiter> {
    const new_product:Waiter = await new MainUser().saveWaiter(<Waiter>(user));
    return <SaveReqWaiter>(new_product);
  }
  @Post('/getbill')
  async getorder(@Body() getreq: GetOrder): Promise<any> {
    
    const admin:any = await new MainOrder().getOrder(getreq.id);
    let sum = 0;
    for (let index = 0; index < admin.Food.length; index++) {
      const ids = admin.Food[index];
      let fooditems: any = await FoodsSchema.findById(ids);
      console.log(fooditems.food_price);
      let price = +fooditems.food_price;

      sum += price;
      console.log("Total bill: " + sum);
    }
    if (admin === null) throw new CustomeError(404, "Order not found");
    return sum;
  }
}