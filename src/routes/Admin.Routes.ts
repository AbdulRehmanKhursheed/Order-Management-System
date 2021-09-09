import express from 'express';
import { AdminController } from '../controller/Admin.controller';
import { Food } from '../type/document/IAdmin';
import { deleteFood, GetFood, SaveReqFood, UpdateReqFood } from '../type/request/Admin.request';
import { SaveUpdateResFood } from '../type/responses/Admin.response';
import CustomeError from '../utills/error';
const auth=require('../middleware/auth');
const userauth=require('../middleware/Userauth');
const mixauth=require('../middleware/Mixauth');
export class AdminRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post('/savefooditem', async (req, res, next) => {
      try {
        const product: SaveReqFood = req.body;
        const newProduct:SaveUpdateResFood = await new AdminController().saveadmin(product);
        res.status(200).json({
          message: newProduct
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/getfooditem',auth, async (req, res, next) => {
      try {
        const getreq:GetFood = req.body;
          const admin:SaveUpdateResFood = await new AdminController().getadmin(getreq);
          res.send(admin);
      } catch (error) {
        next(error);
      }
    });
    this.router.put('/updatefooditem',auth, async (req, res, next) => {
      try {
        const product: UpdateReqFood = req.body;
        const upadated_admin:SaveUpdateResFood = await new AdminController().updateAdmin(product);
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
    this.router.delete('/deletefooditem',auth, async (req, res, next) => {
      try {
        const delreq:deleteFood = req.body;
        const Deleted_product = await new AdminController().deletadmin(delreq);
        res.status(200).json({
          message: 'Product deleted'
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/getfoodmenu',mixauth, async (req, res, next) => {
      try {
        const adminList: SaveUpdateResFood[] = await new AdminController().getadminList();
        res.status(200).json({
          result: adminList
        });

      } catch (error) {
        next(error);
      }
    });
    
  
}
}
export const AdminRoutesApi = new AdminRoutes().router;