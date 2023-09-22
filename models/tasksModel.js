import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    } ,
    description:{
        type:String,
        required:true,
       
    },
    amount:{
        type:Number,
        required:true
    },
    iscompleted:{
        type:String,
         default:false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})



export const  taskmodel = mongoose.model("Task",taskSchema);




