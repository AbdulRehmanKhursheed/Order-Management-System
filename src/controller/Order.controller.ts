import { Orders } from "../type/document/Order";
import { MainOrder } from "../repositories/Order.repositorie";
import CustomeError from "../utills/error";
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  SuccessResponse,
  Security,
} from "tsoa";
import { SaveUpdateResOrder } from "../type/responses/Order.response";
import {
  deleteorder,
  GetOrder,
  SaveReqOrder,
  UpdateReqOrder,
  SearchReqOrder,
} from "../type/request/Order.request";
import { FoodsSchema } from "../models/Admin.model";
import {newUser} from '../routes/Order.Routes'
import path from "path/win32";
@Route("order")
@Tags("order")
@Security("api_key")
export class OrderController {
  constructor() {}
    /**
   *  @summary   To save order you must login first.
   */
  @Post("/saveorder")

  async saveorder(@Body() order: SaveReqOrder): Promise<SaveUpdateResOrder> {
    // let sum = 0;
    // for (let index = 0; index < order.Food.length; index++) {
    //   const ids = order.Food[index];
    //   let fooditems: any = await FoodsSchema.findById(ids);
    //   console.log(fooditems.food_price);
    //   let price = +fooditems.food_price;

    //   sum += price;
    //   console.log("Total bill: " + sum);
    // }
    const new_product: Orders = await new MainOrder().saveOrder(<Orders>order);
    return <SaveUpdateResOrder>new_product;
  }
  @Post("/getorder")
  async getorder(@Body() getreq: GetOrder): Promise<SaveUpdateResOrder> {
    const admin = await new MainOrder().getOrder(getreq.id);
    if (admin === null) throw new CustomeError(404, "Order not found");
    return <SaveUpdateResOrder>admin;
  }
  @Put("/updateorder")
  async updateAdmin(
    @Body() order: UpdateReqOrder
  ): Promise<SaveUpdateResOrder> {
    const update_product = await new MainOrder().updateOrder(<Orders>order);
    if (update_product === null)
      throw new CustomeError(400, "Order not updated");
    return <SaveUpdateResOrder>update_product;
  }
  @Delete("/deleteorder")
  @SuccessResponse("200", "Product deleted")
  async deleteOrder(@Body() delreq: {id: string}): Promise<any> {
    const order= await new MainOrder().deleteOrder(delreq.id);
    if(!order)
      throw new CustomeError(404, "Order not found");
    return true;

  }
  @Post("/getorderlist")
  async getOrderlist(): Promise<SaveUpdateResOrder[]> {
       const orders: any = await new MainOrder().getOrderList();
    return <SaveUpdateResOrder[]>orders;
  }
}
