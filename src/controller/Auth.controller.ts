import { Waiter } from '../type/document/Waiter';
import { MainAuth} from '../repositories/Auth.repositorie';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse } from "tsoa";
import { SaveUpdateResFood } from '../type/responses/Admin.response';
import { getReqAuth} from '../type/request/Auth.request';
@Route('auth')
@Tags('auth')
export class AuthController {
  constructor() { }
  @Post('/getauth')
  async getauthuser(@Body() user: {email: string, password:string}): Promise<getReqAuth> {
    const admin = await new MainAuth().getAuth(user);
    if (admin === null) throw new CustomeError(400, 'Invalid email or password');
    return <getReqAuth>admin; 
  }
}