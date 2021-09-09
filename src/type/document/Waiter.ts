import { Document } from 'mongoose';
export interface Waiter extends Document {
  _id:string;
  name:string;
  email:string;
  password:string;
  isAdmin:boolean;
  isWaiter:boolean;
  createdAt?: string;
  updatedAt?: string;
}