import jwt from 'jsonwebtoken';
import { usermodel } from '../models/userModel.js';

export const isAuthenticated = async(req,res,next)=>{


    try {
      

        const { token} = await req.cookies
  
     
     if(!token)
     {
     return res.status(404).json({sucess:false,message:"login first!"})
  
     }
  
     const decodedtoken = jwt.verify(token,process.env.JWT)
  
     
     req.current = await usermodel.findById(decodedtoken.id)
  
       await next( )
  
  
     } catch (error) {
  
  
        res.status(404).json({error});
        
        
     }

}