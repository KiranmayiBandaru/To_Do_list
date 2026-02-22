import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    
    title: {type : String , required : true} ,
    completed : {type : Boolean , default : false},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    deadline : {type : Date},
},{
    timestamps : true
});

const UserTasks = mongoose.model('UserTasks', taskSchema);
export default UserTasks ;