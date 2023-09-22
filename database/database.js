import mongoose from "mongoose"

export const mongodb = async( ) =>{
    
  try {

 await mongoose.connect(process.env.MONGODB_URL,{dbName: "Backend"})
.then(()=> console.log("database is connected"))
.catch((e)=> console.log(e))
    
  } catch (error) {
    
    console.log(error)
  }

}