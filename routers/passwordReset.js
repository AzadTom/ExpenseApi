import express from 'express'
import  crypto  from 'crypto'
import { usermodel } from '../models/userModel.js';
import {  tokenmodel } from "../models/tokenModel.js"
import  bcryptjs from "bcryptjs"


const passwordRouter = express.Router( )

passwordRouter.get("/password-reset/:userId/:tokon",async(req,res)=>{


    const {userId, tokon} = req.params;

    res.status(200).cookie("comfirmuser",{ 
        userId:userId,
        tokon:tokon
    },{
        httpOnly:true,
        maxAge: 15*60*1000,
        sameSite: process.env.NODE_ENV === "Developement"? "lax":"none",
        secure: process.env.NODE_ENV === "Developement"? false : true
    })
    .render("changepassword");


})


passwordRouter.post("/password-reset",async(req,res)=>{


       

           

            try {
                
                const {comfirmuser} = req.cookies


                const user = await usermodel.findById(comfirmuser.userId)

                if(!user)
                {
                    return res.status(404).json({message:"invalid link or expired!"})
                }

                const token  = await tokenmodel.findOne({
                    userId: user._id,
                    token:comfirmuser.tokon
                })


                if(!token)
                {
                    return res.status(400).json({message:"invalid link or expired!"})

                }


                const hashedpassword = await bcryptjs.hash(req.body.password,10);
                user.password = hashedpassword

                await user.save( )

                await token.deleteOne()

                res.status(200).render("passwordreset")

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

        res.status(200).redirect(`password/password-reset/${user._id}/${token.token}`)


    






        
    } catch (error) {


        res.status(404).json({message:"An error occured!"})
       

        
    }

})


export {passwordRouter}