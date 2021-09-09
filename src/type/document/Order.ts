import { Document } from 'mongoose';
export interface Orders extends Document {
  _id:string;
  Customer_name:string;
  Table_no:string;
  Waiter:object;
  Food:object[];
  Order_status:number;
  createdAt?: string;
  updatedAt?: string;
}