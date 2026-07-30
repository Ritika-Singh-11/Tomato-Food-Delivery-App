// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRouter from "./routes/userRoutes.js"
// import "dotenv/config"
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"

// // App config
// const app=express()
// const port = process.env.PORT || 4000;
// // middleware
// app.use(express.json())
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   }))

// //db connected 
// connectDB();

// //API endpoint
// app.use("/api/food",foodRouter)
// app.use('/images',express.static('uploads'))
// app.use('/api/user',userRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)

// app.get("/",(req,res)=>{
//     res.send("ApI Working")
// })

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });


import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// App config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : [];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/tomato-food-delivery-app-nn5y.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/tomato-food-delivery-app-ebon.*\.vercel\.app$/.test(origin);

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
}))

//db connected 
connectDB();

//API endpoint
app.use("/api/food", foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
    res.send("ApI Working")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});