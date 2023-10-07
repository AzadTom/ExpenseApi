
import { ErrorHandler } from "../middlewares/error.js";
import { taskmodel } from "../models/tasksModel.js"


export const getMyTask = async(req,res,next)=>{


     try {


      const userid = req.current._id;


     const tasks = await taskmodel.find({user:userid})

      if(!tasks)
      {
        return next(new ErrorHandler("Invalid id!",404));

      }

     res.status(200).json({
        success:true,
        tasks
       })
      
     } catch (error) {

      next(error)
      
     }

       


}

export const newTask = async(req,res,next)=>{


  try {
    
    const {title,description,type,amount} = req.body;

    await taskmodel.create({
            title,
            description,
            type,
            amount,
            user : req.current._id,

    })

    res.status(201).json({success:true ,message:"task creates successfully!"})
  } catch (error) {
    
    next(error);
      
  }

}  


export const deleteTask = async(req,res,next) => {

   

  try {

    const {id} = req.params;

    const task = await taskmodel.deleteOne({_id:id});

    if(!task)
    {
      return next(new ErrorHandler("invalid task!",404));
    }

    res.status(200).json({success:true,message:"deleted successfully!"})

    
  } catch (error) {


   next(error);
      
    
  }
  

}

