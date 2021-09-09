import express from 'express';
const auth=require('../middleware/auth');
const userauth=require('../middleware/Userauth');
import { UserController } from '../controller/User.controller';
import { Waiter } from '../type/document/Waiter';
import { SaveReqWaiter,getReqBill} from '../type/request/User.request';
import { SaveUpdateResWaiter } from '../type/responses/User.response';
import { OrderController } from '../controller/Order.controller';
import { deleteorder, GetOrder, SaveReqOrder, SearchReqOrder, UpdateReqOrder } from '../type/request/Order.request';
import CustomeError from '../utills/error';
const bcrypt=require('bcrypt');
export class WaiterRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post('/savewaiter',auth, async (req, res, next) => {
      try {
        const user: SaveReqWaiter = req.body;
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        const newUser:SaveReqWaiter = await new UserController().savewaiter(user);
        res.status(200).json({
          message: newUser
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/getbill', async (req, res, next) => {
      try {
        const getreq:GetOrder = req.body;
          const admin:string = await new UserController().getorder(getreq);
          console.log(admin);
            res.json({
              "Bill": admin,
            });
      } catch (error) {
        next(error);
      }
    });
}
}
export const UserRoutesApi = new WaiterRoutes().router;