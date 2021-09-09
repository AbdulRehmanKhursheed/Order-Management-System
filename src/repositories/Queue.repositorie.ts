import {OrdersSchema } from '../models/Admin.model';
import { Queues } from '../type/document/Queues';
import { FoodsSchema } from '../models/Admin.model';
import { type } from 'os';
export class MainOrder {
  constructor() {}
  getOrderQueue() {
     
      
    return OrdersSchema.find({Order_status:0}).populate('Food','food_itemname food_size food_price').limit(1);
  }
//   saveOrder(ORDer: Orders) {
//     const queue =new Queue(ORDer).save();
//     return new OrdersSchema(ORDer).save();
//   }
  updateOrderQ(Admmin: Queues) {
     
    return OrdersSchema.findByIdAndUpdate(
        {_id:Admmin._id},
            {
                $set: {Order_status:1}
            }, { new: true }
    )
  }
    updateOrderQnext(Admmin: Queues) {
     
    return OrdersSchema.findByIdAndUpdate(
        {_id:Admmin._id},
            {
                $set: {Order_status:2}
            }, { new: true }
    )
  }
  deleteOrder(_id: string) {
    return OrdersSchema.findByIdAndDelete(_id);
  }
  getOrderList() {
   return OrdersSchema.find().populate('Food','food_itemname food_price food_size');
  }

}