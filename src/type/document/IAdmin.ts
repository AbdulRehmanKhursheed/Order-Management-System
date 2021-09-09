import { Document } from 'mongoose';
export interface Food extends Document {
  _id:string;
  food_itemname:string ,
  food_price:  string ,
  food_type: string ,
  food_size: string ,
  createdAt?: string;
  updatedAt?: string;
}