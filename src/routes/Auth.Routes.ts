import express from "express";
const config=require('config');
const jwt=require('jsonwebtoken')
import { AuthController } from "../controller/Auth.controller";
import { Waiter } from "../type/document/Waiter";
import { getReqAuth } from "../type/request/Auth.request";
import { SaveUpdateResWaiter } from "../type/responses/User.response";
import CustomeError from "../utills/error";
const bcrypt = require("bcrypt");
export class AuthRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post("/getauth", async (req, res, next) => {
      try {
        const newUser: any = await new AuthController().getauthuser(
          req.body
        );
        if (newUser) {
          const valid = await bcrypt.compare(
            req.body.password,
            newUser.password
          );
          if (!valid) return res.status(400).send("Invalid emails or password");
        }
        const token=jwt.sign({_id:newUser._id,email: newUser.email,isAdmin:newUser.isAdmin,isWaiter:newUser.isWaiter}, 'jwtPrivateKey');
        res.header('x-auth-token',token)
        res.status(200).json({
          message: newUser,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
export const AuthRoutesApi = new AuthRoutes().router;
