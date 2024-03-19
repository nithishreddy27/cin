import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    
    const userId = req.query.userId
    console.log("user id ",userId);    
    const user = await User.findOne({userId : userId})
    if(user){

      console.log("user ",user);
      // console.log("inside api",name , age)
      res.status(200).json({ person: user })
    }
    else{
      res.status(200).json({error:"User not found"})
    }
  }