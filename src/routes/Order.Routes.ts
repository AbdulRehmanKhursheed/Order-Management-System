import express from 'express';
import { OrderController } from '../controller/Order.controller';
import { Orders } from '../type/document/Order';
import { deleteorder, GetOrder, SaveReqOrder, SearchReqOrder, UpdateReqOrder } from '../type/request/Order.request';
import { SaveUpdateResOrder } from '../type/responses/Order.response';
import CustomeError from '../utills/error';
const auth=require('../middleware/auth');
const userauth=require('../middleware/Userauth');
const mixauth=require('../middleware/Mixauth');
const jwt = require("jsonwebtoken");

let newuser:any;
export class OrderRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post('/saveorder',mixauth, async (req, res, next) => {
      try {
        const order: any = req.body;
          const newtoken=req.header('Authorization');
          const token = newtoken && newtoken.split(' ')[1];
          const decoded=jwt.verify(token,'jwtPrivateKey');
          const user=decoded;
          newuser=user._id;
        order.Waiter=newuser;
        const newOrder:SaveUpdateResOrder = await new OrderController().saveorder(order);
        res.status(200).json({
          message: newOrder
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/getorder',mixauth, async (req, res, next) => {
      try {
        const getreq:GetOrder = req.body;
          const admin:SaveUpdateResOrder = await new OrderController().getorder(getreq);
          res.send(admin);
      } catch (error) {
        next(error);
      }
    });
    this.router.put('/updateorder',userauth, async (req, res, next) => {
      try {
        const product: UpdateReqOrder = req.body;
        const upadated_admin:SaveUpdateResOrder = await new OrderController().updateAdmin(product);
        const response = {
          upadated_admin,
        };
        res.status(200).json({
          message: response
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.delete('/deleteorder',userauth, async (req, res, next) => {
      try {
        const delreq:deleteorder = req.body;
        const Deleted_product = await new OrderController().deleteOrder(delreq);
        res.status(200).json({
          message: 'Product deleted'
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/getorderlist',async (req, res, next) => {
      try {
        const newtoken=req.header('Authorization');
        const token = newtoken && newtoken.split(' ')[1];
        const decoded=jwt.verify(token,'jwtPrivateKey');
        const user=decoded;
        newuser=user._id;
        const adminList: SaveUpdateResOrder[] = await new OrderController().getOrderlist();
        if(user.isAdmin==true){
          res.status(200).json({
            result: adminList
          });
        }
        else{
          let arr:SaveUpdateResOrder[]=[];
          // console.log(user._id);
         
          for (let i=0; i<adminList.length;i++){
            // console.log(newuser==adminList[i].Waiter);
            if (newuser==adminList[i].Waiter) {
              arr.push(adminList[i])
            }
          }
          res.status(200).json({
            result: arr
          });
  
        }
      
      } catch (error) {
        next(error);
      }
    });

  
}
}
export const newUser=newuser;
export const OrderRoutesApi = new OrderRoutes().router;