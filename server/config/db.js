import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Database connection sucessful!");
       
    }catch(err){
        console.error("database connection failed :" , err);
        process.exit(1);
    }
}
