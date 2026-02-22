import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
       await mongoose.connect('mongoose://127.0.0.1:27017/TaskManagerDB');
       console.log("Database connection sucessful!");
       process.exit(0);
    }catch(err){
        console.error("database connection failed :" , err);
        process.exit(1);
    }
}