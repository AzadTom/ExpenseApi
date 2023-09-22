export class ErrorHandler extends Error {


    constructor(message,statuscode){

        super(message);
        this.statuscode =statuscode

    }

}

export const errorMiddleWare = (error,req,res,next)=>{


    error.message = error.message || "Internal Server Error!"
    error.statuscode =  error.statuscode || 500

        
    return res.status(error.statuscode).json({
        success:false,
        message:error.message
    })


  }

