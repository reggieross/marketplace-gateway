import {Request, Response, NextFunction} from "express";
import {ReqAttributes} from "../const/ReqAttibutes";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[ReqAttributes.ACCESS_TOKEN];
  console.log(token)
  // if (!token) {
  //   res.status(401).send({message: "You must be logged in to use this service"});
  // }

  const userInfo = {};

  req[ReqAttributes.USER_INFO] = userInfo;
  next();
};