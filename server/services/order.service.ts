import { NextFunction,Response } from "express";
import { CatchAsyncError } from "../middleware/catshAsyncError";
import OrderModel from "../models/order.model";
import CourseModel from "../models/course.model";


// create new order
export const newOrder = CatchAsyncError(async(data:any,res:Response)=>{
    const order = await OrderModel.create(data);

      res.status(201).json({
        success: true,
        message: "order created successfully",
        order
      });



});

//Get all Orders
export const getAllOrdersService=async(res:Response)=>{
   const orders = await OrderModel.find().sort({createdAt:-1});

    res.status(200).json({
      success: true,
      orders,
    });
  };
