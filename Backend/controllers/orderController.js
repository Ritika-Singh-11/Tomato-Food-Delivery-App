import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new OrderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    const options = {
      amount: req.body.amount * 100*80,
      currency: "INR",
      receipt: `receipt_${newOrder._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      await UserModel.findByIdAndUpdate(req.userId, {
        cartData: {},
      });

      return res.json({
        success: true,
        message: "Payment Verified",
      });
    } else {
      await OrderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment Verification Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// user orders for frontend
// const usersOrder= async (req,res)=>{
// try {
//   const orders=await OrderModel.find({
//     userId:req.userId
//   })
//   res.json({success:true,
//     data:orders
//   })
// } catch (error) {
//   console.log(error);
//   res.json({

//     success:false,
//     message:"Error"
//   })
  
// }
// }


const usersOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//listing for admin panel
const listOrders=async (req,res)=>{
  try {
      const orders=await OrderModel.find();
      res.json({
        success:true,
        data:orders
      })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:"Error"
    })
  }
}


// api for updating order status
const updateStatus=async (req,res)=>{
try {
  await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({
    success:true,
    message:"Status updated"
  })
} catch (error) {
  console.log(error);
  res.json({
    success:false,
    message:"Error"
  })
}
}




export { placeOrder, verifyPayment,usersOrder,listOrders,updateStatus };