import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  usersOrder,
  verifyPayment,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyPayment);
orderRouter.post('/userorders',usersOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)
export default orderRouter;