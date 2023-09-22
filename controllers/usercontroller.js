import { usermodel } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../middlewares/error.js";

export const getProfile = (req, res) => {

  res.status(200).json({ success: true, currentuser: req.current });

};

export const logoutUser = async (req, res,next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("token not found!", 404));
    }

    await res.status(200) .cookie("token", "",{
      httpOnly:true,
      maxAge: 15*60*1000,
      sameSite: process.env.NODE_ENV === "Developement"? "lax":"none",
      secure: process.env.NODE_ENV === "Developement"? false : true
  }) .json({ sucess: true, token: `${token}` });

  } catch (error) {

     next(error)
  }

};

export const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("user not found!",404));
    }

    const isMatch = bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("password does not match!",404));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);


    res.status(200).cookie("token", token,{
      httpOnly:true,
      maxAge: 15*60*1000,
      sameSite: process.env.NODE_ENV === "Developement"? "lax":"none",
      secure: process.env.NODE_ENV === "Developement"? false : true
  }).json({success:true,message:"user login successfully!"})

  } catch (error) {
    next(error)
  }
};

export const registerUser = async (req, res,next) => {
 
   try {

    const { name, email, password } = req.body;

    const user = await usermodel.findOne({ email: email });
  
    if (user) {
      return next(new ErrorHandler("user already registered!",404));
    }
  
    const hashedpassword = await bcryptjs.hash(password, 10);
  
    const register = await usermodel.create({
      name: name,
      email: email,
      password: hashedpassword,
    });
  
    const token = jwt.sign({ id: register._id }, process.env.JWT);
  
    res.status(201).cookie("token", token,{
      httpOnly:true,
      maxAge: 15*60*1000,
      sameSite: process.env.NODE_ENV === "Developement"? "lax":"none",
      secure: process.env.NODE_ENV === "Developement"? false : true
  }).json({success:true,message:"user register successfully!"})
    
   } catch (error) {

    next(error)
    
   }
};
