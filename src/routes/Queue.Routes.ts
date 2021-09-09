import express from 'express';
import { QueueController } from '../controller/Queue.controller';
import { Orders } from '../type/document/Order';
import { deleteorder,  SearchReqOrder, UpdateReqOrderQueue } from '../type/request/Order.request';
import { SaveUpdateResOrder } from '../type/responses/Order.response';
import CustomeError from '../utills/error';
const auth=require('../middleware/auth');
const userauth=require('../middleware/Userauth');
const mixauth=require('../middleware/Mixauth');
const jwt = require("jsonwebtoken");

let newuser:any;
export class QueueRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    // this.router.post('/saveorder', async (req, res, next) => {
    //   try {
    //     const order: SaveReqOrder = req.body;
    //     const newOrder:SaveUpdateResOrder = await new OrderController().saveorder(order);
    //     res.status(200).json({
    //       message: newOrder
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    this.router.post('/getiteminqueue',mixauth, async (req, res, next) => {
      try {
          const admin:SaveUpdateResOrder[] = await new QueueController().getorder();
          res.send(admin);
      } catch (error) {
        next(error);
      }
    });
    this.router.put('/updateorder',userauth, async (req, res, next) => {
      try {
        const product: UpdateReqOrderQueue = req.body;
        const upadated_admin:SaveUpdateResOrder = await new QueueController().updateAdmin(product);
        const response = {
          upadated_admin,
        };
        let timeset:number=10000
        console.log(`Your order is in process. Please wait for ${timeset/1000} seconds`);
         setTimeout(async ()=>{
            const upadated_admin:SaveUpdateResOrder =  await new QueueController().updateAdminnext(product);
            console.log("Order is Ready")
            res.status(200).json({
                message: upadated_admin
              });
        },timeset)
        
      } catch (error) {
        next(error);
      }
    });
    this.router.put('/orderserved',userauth, async (req, res, next) => {
        try {
          const product: UpdateReqOrderQueue = req.body;
          const upadated_admin:SaveUpdateResOrder = await new QueueController().updateAdminserved(product);
          const response = {
            upadated_admin,
          };
          res.status(200).json({
            message: upadated_admin
          });
        } catch (error) {
          next(error);
        }
      });
    this.router.delete('/deleteorder',userauth, async (req, res, next) => {
      try {
        const delreq:deleteorder = req.body;
        const Deleted_product = await new QueueController().deleteOrder(delreq);
        res.status(200).json({
          message: 'Product deleted'
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/pendingorders',async (req, res, next) => {
      try {
        const newtoken=req.header('Authorization');
        const token = newtoken && newtoken.split(' ')[1];
        const decoded=jwt.verify(token,'jwtPrivateKey');
        const user=decoded;
        newuser=user._id;
        let arr:SaveUpdateResOrder[]=[];
        // console.log(user._id);
        const adminList: SaveUpdateResOrder[] = await new QueueController().getOrderlistp();
        for (let i=0; i<adminList.length;i++){
          // console.log(newuser==adminList[i].Waiter);
          if (newuser==adminList[i].Waiter) {
            arr.push(adminList[i])
          }
        }
        res.status(200).json({
          result: arr
        });

      } catch (error) {
        next(error);
      }
    });
    this.router.post('/waitingorders',async (req, res, next) => {
        try {
          const newtoken=req.header('Authorization');
          const token = newtoken && newtoken.split(' ')[1];
          const decoded=jwt.verify(token,'jwtPrivateKey');
          const user=decoded;
          newuser=user._id;
          let arr:SaveUpdateResOrder[]=[];
          // console.log(user._id);
          const adminList: SaveUpdateResOrder[] = await new QueueController().getOrderlistw();
          for (let i=0; i<adminList.length;i++){
            // console.log(newuser==adminList[i].Waiter);
            if (newuser==adminList[i].Waiter) {
              arr.push(adminList[i])
            }
          }
          res.status(200).json({
            result: arr
          });
  
        } catch (error) {
          next(error);
        }
      });
      this.router.post('/readyorders',async (req, res, next) => {
        try {
          const newtoken=req.header('Authorization');
          const token = newtoken && newtoken.split(' ')[1];
          const decoded=jwt.verify(token,'jwtPrivateKey');
          const user=decoded;
          newuser=user._id;
          let arr:SaveUpdateResOrder[]=[];
          // console.log(user._id);
          const adminList: SaveUpdateResOrder[] = await new QueueController().getOrderlistr();
          for (let i=0; i<adminList.length;i++){
            // console.log(newuser==adminList[i].Waiter);
            if (newuser==adminList[i].Waiter) {
              arr.push(adminList[i])
            }
          }
          res.status(200).json({
            result: arr
          });
  
        } catch (error) {
          next(error);
        }
      });
      this.router.post('/servedorders',async (req, res, next) => {
        try {
          const newtoken=req.header('Authorization');
          const token = newtoken && newtoken.split(' ')[1];
          const decoded=jwt.verify(token,'jwtPrivateKey');
          const user=decoded;
          newuser=user._id;
          let arr:SaveUpdateResOrder[]=[];
          // console.log(user._id);
          const adminList: SaveUpdateResOrder[] = await new QueueController().getOrderlists();
          for (let i=0; i<adminList.length;i++){
            // console.log(newuser==adminList[i].Waiter);
            if (newuser==adminList[i].Waiter) {
              arr.push(adminList[i])
            }
          }
          res.status(200).json({
            result: arr
          });
  
        } catch (error) {
          next(error);
        }
      });
  
}
}

export const QueueRoutesApi = new QueueRoutes().router;