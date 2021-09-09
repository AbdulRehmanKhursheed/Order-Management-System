import { Food } from '../type/document/IAdmin';
import { MainAdmin } from '../repositories/Admin.repositorie';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import { SaveUpdateResFood } from '../type/responses/Admin.response';
import { deleteFood, GetFood, SaveReqFood,UpdateReqFood } from '../type/request/Admin.request';
@Route('product')
@Tags('Food')
@Security('api_key')
export class AdminController {
  constructor() { }
  @Post('/savefooditem')
  async saveadmin(@Body() product: SaveReqFood): Promise<SaveUpdateResFood> {
    const new_product:Food = await new MainAdmin().saveAdmin(<Food>(product));
    return <SaveUpdateResFood>(new_product);
  }
  @Post("/getfooditem")
  async getadmin(@Body() getreq:GetFood): Promise<SaveUpdateResFood> {
    const admin = await new MainAdmin().getAdmin(getreq.id);
    if (admin === null) throw new CustomeError(404, 'Admin not found');
    return <SaveUpdateResFood>admin; 
  }
  @Put('/updatefooditem')
  async updateAdmin(@Body() product: UpdateReqFood): Promise<SaveUpdateResFood> {
    const update_product = await new MainAdmin().updateAdmin(<Food>(product));
    if (update_product === null)
      throw new CustomeError(400, 'Product not updated');
    return <SaveUpdateResFood>update_product;
  }
  @Delete('/deletefooditem')
  @SuccessResponse("200","Product deleted")
  async deletadmin(@Body() delreq: deleteFood): Promise<any> {
    return await new MainAdmin().deletAdmin(delreq.id);
  }
  @Post('/getfoodmenu')
  async getadminList(): Promise<SaveUpdateResFood[]> {
    const admin: Food[] = await new MainAdmin().getAdminslist();
    return <SaveUpdateResFood[]>(admin);
  }
}