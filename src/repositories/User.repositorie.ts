import { WaitersSchema } from '../models/Admin.model';
import { Waiter } from '../type/document/Waiter';
export class MainUser {
  constructor() {}
//   getAdmin(_id: string) {
//     return ProductsSchema.findById(_id);
//   }
  async saveWaiter(Userr: Waiter) {
    return new WaitersSchema(Userr).save();
  }
}