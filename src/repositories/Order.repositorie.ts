import { OrdersSchema } from '../models/Admin.model';
import { Orders } from '../type/document/Order';
import { FoodsSchema } from '../models/Admin.model';
import { type } from 'os';
export class MainOrder {
  constructor() {}
  getOrderQueue() {
     
      
    return OrdersSchema.find({Order_status:0}).populate('Food','food_itemname food_size food_price').limit(1);
  }
  getOrder(_id: string) {
    return OrdersSchema.findById(_id).populate('Food','food_itemname food_size food_price');
  }
  saveOrder(ORDer: Orders) {
    
    return new OrdersSchema(ORDer).save();
  }
  updateOrderQ(Admmin: Orders) {
     
    return OrdersSchema.findByIdAndUpdate(
        {_id:Admmin._id},
            {
                $set: {Order_status:1}
            }, { new: true }
    )
  }
 
  updateOrderQnext(Admmin: Orders) {
     
    return OrdersSchema.findByIdAndUpdate(
        {_id:Admmin._id},
            {
                $set: {Order_status:2}
            }, { new: true }
    )
  }
  updateOrderQserved(Admmin: Orders) {
     
    return OrdersSchema.findByIdAndUpdate(
        {_id:Admmin._id},
            {
                $set: {Order_status:3}
            }, { new: true }
    )
  }
  updateOrder(Admmin: Orders) {
    return OrdersSchema.findByIdAndUpdate(Admmin._id, Admmin, 
      {
      new: true
    });
  }
  deleteOrder(_id: string) {
    return OrdersSchema.findByIdAndDelete(_id);
  }
  getOrderList() {
    return OrdersSchema.find().populate('Food','food_itemname food_price ood_size');
   }
   getOrderListP() {
    return OrdersSchema.find({Order_status:0}).populate('Food','food_itemname food_price ood_size');
   }
  getOrderListW() {
   return OrdersSchema.find({Order_status:1}).populate('Food','food_itemname food_price ood_size');
  }
  getOrderListR() {
    return OrdersSchema.find({Order_status:2}).populate('Food','food_itemname food_price ood_size');
   }
   getOrderListS() {
    return OrdersSchema.find({Order_status:3}).populate('Food','food_itemname food_price ood_size');
   }

}