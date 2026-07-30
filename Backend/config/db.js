import mongoose from "mongoose"

export const connectDB=async (err)=>{
    await mongoose.connect('mongodb+srv://Ritika-singh:Ritika123@cluster0.qokggkw.mongodb.net/food-del').then(()=>console.log("DB connected"))
    .catch('Database connection failed give correct url',err);
    
}