import express from 'express'
import  crypto  from 'crypto'
import { usermodel } from '../models/userModel.js';
import {  tokenmodel } from "../models/tokenModel.js"
import  bcryptjs from "bcryptjs"


const passwordRouter = express.Router( )




passwordRouter.post("/password-reset",async(req,res)=>{


       

           

            try {
                
            


                const user = await usermodel.findById(req.body.userId)

                if(!user)
                {
                    return res.status(404).json({message:"invalid link or expired!"})
                }

                const token  = await tokenmodel.findOne({
                    userId: user._id,
                    token:req.body.tokon
                })


                if(!token)
                {
                    return res.status(400).json({message:"invalid link or expired!"})

                }


                const hashedpassword = await bcryptjs.hash(req.body.password,10);
                user.password = hashedpassword

                await user.save( )

                await token.deleteOne()

                res.status(200).json({success:true,message:"password reset successfully!"})

            } catch (error) {
                
                res.status(404).json({message:"An error occured!"})
               
            }
    

})

passwordRouter.post("/",async(req,res)=>{


    try {


        const {email} = req.body

        const user = await usermodel.findOne({email:email})

        if(!user)
        {
            return res.status(400).json({message:"user does not exist!"})
        }

        let token = await tokenmodel.findOne({userId:user._id})


        if(!token)
        {
            token = await  tokenmodel.create({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            })

        }


         res.status(200).json({userid:user._id ,tokon:token.token})
       
        
    } catch (error) {


        res.status(404).json({message:"An error occured!"})
       

        
    }

})


export {passwordRouter}