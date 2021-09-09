import { FoodsSchema } from '../models/Admin.model';
import { Food } from '../type/document/IAdmin';
export class MainAdmin {
  constructor() {}
  getAdmin(_id: string) {
    return FoodsSchema.findById(_id);
  }
  saveAdmin(ADMin: Food) {
    return new FoodsSchema(ADMin).save();
  }
  updateAdmin(Admmin: Food) {
    return FoodsSchema.findByIdAndUpdate(Admmin._id, Admmin, 
      {
      new: true
    });
  }
  deletAdmin(_id: string) {
    return FoodsSchema.findByIdAndDelete(_id);
  }
  getAdminslist() {
   return FoodsSchema.find();
  }
 
}