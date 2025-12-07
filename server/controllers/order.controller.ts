import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catshAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import OrderModel, { IOrder } from "../models/order.model";
import CourseModel, { ICourse } from "../models/course.model";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create order

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;

          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          // ❗ المنطقي هنا: لو مش ناجح → اعمل error
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("Payment not authorized!", 400));
          }

        }
      }

      const user = await userModel.findById(req.user?._id);

      const courseExistUnUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistUnUser) {
        return next(
          new ErrorHandler("you have already purchase this course", 400)
        );
      }

      const course:ICourse | null = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id?.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          data: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "order confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push({ courseId: (course._id as string).toString() });

      await redis.set(req.user?._id as string, JSON.stringify(user))

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `you have a new order from ${course?.name}`,
      });

      course.purchased += 1;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all Orders -- admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
        return next(new ErrorHandler("Stripe secret key not configured or invalid", 500));
      }

      const amount = req.body.amount;
      if (!amount || isNaN(amount) || amount <= 0) {
        return next(new ErrorHandler("Invalid amount", 400));
      }

      const myPayment = await stripe.paymentIntents.create({
        amount: amount, // amount in cents
        currency: "USD",
        metadata: {
          company: "E-Learning",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
