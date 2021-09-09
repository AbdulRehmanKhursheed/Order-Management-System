import { Queues } from "../type/document/Queues";
import { MainOrder } from "../repositories/Order.repositorie";
import CustomeError from "../utills/error";
import {  Get,  Route,  Tags,  Post,  Body,  Path,  Put,  Delete,  SuccessResponse, Security} from "tsoa";
import { SaveUpdateResOrder } from "../type/responses/Order.response";
import { deleteorder, UpdateReqOrderQueue, SearchReqOrder,} from "../type/request/Order.request";
import path from "path/win32";
@Route("queue")
@Tags("Queue")
@Security("api_key")
export class QueueController {
  constructor() {}
//   @Post("/saveorder")
//   async saveorder(@Body() order: SaveReqOrder): Promise<SaveUpdateResOrder> {
//     const new_product: Orders = await new MainOrder().saveOrder(<Orders>order);
//     return <SaveUpdateResOrder>new_product;
//   }
  @Post("/getiteminqueue")
  async getorder(): Promise<SaveUpdateResOrder[]> {
    const orders: any = await new MainOrder().getOrderQueue();
    return <SaveUpdateResOrder[]>orders;
  }
  
  @Put("/updateorder")
  async updateAdmin(
    @Body() order: UpdateReqOrderQueue
  ): Promise<SaveUpdateResOrder> {
    const update_product = await new MainOrder().updateOrderQ(<Queues>order);
    if (update_product === null)
      throw new CustomeError(400, "Order not updated");
    return <SaveUpdateResOrder>update_product;
  }
 
  async updateAdminnext(
    @Body() order: UpdateReqOrderQueue
  ): Promise<SaveUpdateResOrder> {
    const update_product = await new MainOrder().updateOrderQnext(<Queues>order);
    if (update_product === null)
      throw new CustomeError(400, "Order not updated");
    return <SaveUpdateResOrder>update_product;
  }
  @Put("/orderserved")
  async updateAdminserved(
    @Body() order: UpdateReqOrderQueue
  ): Promise<SaveUpdateResOrder> {
    const update_product = await new MainOrder().updateOrderQserved(<Queues>order);
    if (update_product === null)
      throw new CustomeError(400, "Order not updated");
    return <SaveUpdateResOrder>update_product;
  }
  @Delete("/deleteorder")
  @SuccessResponse("200", "Product deleted")
  async deleteOrder(@Body() delreq: {id: string}) :Promise<any>{
    return await new MainOrder().deleteOrder(delreq.id);
  }
  @Post("/pendingorders")
  async getOrderlistp(): Promise<SaveUpdateResOrder[]> {
       const orders: any = await new MainOrder().getOrderListP();
    return <SaveUpdateResOrder[]>orders;
  }
  @Post("/waitingorders")
  async getOrderlistw(): Promise<SaveUpdateResOrder[]> {
       const orders: any = await new MainOrder().getOrderListW();
    return <SaveUpdateResOrder[]>orders;
  }
  @Post("/readyorders")
  async getOrderlistr(): Promise<SaveUpdateResOrder[]> {
       const orders: any = await new MainOrder().getOrderListR();
    return <SaveUpdateResOrder[]>orders;
  }
  @Post("/servedorders")
  async getOrderlists(): Promise<SaveUpdateResOrder[]> {
       const orders: any = await new MainOrder().getOrderListS();
    return <SaveUpdateResOrder[]>orders;
  }
}
