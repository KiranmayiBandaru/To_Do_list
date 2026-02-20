import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://127.0.0.1:27017/TaskManagerDB');
      console.log("DataBase Connect Sucessful!");
      process.exit(0);
  }catch(err){
      console.error("DataBase connection failed", err);
      process.exit(1);
  }
};

connectDB();