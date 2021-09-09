import { WaitersSchema } from '../models/Admin.model';
import { Waiter } from '../type/document/Waiter';
export class MainAuth {
  constructor() {}
//   getAdmin(_id: string) {
//     return ProductsSchema.findById(_id);
//   }
  async getAuth(Userr: any) {

    // let user= await UsersSchema.findOne({ email:Userr.email});
    // if(user) return Userr;
    
    return WaitersSchema.findOne({email:Userr.email});
    // return new UsersSchema(Userr).findOne();
  }

}