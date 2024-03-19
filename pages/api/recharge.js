import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    
    const {userId ,amount } = req.body
    // console.log("user id ",userId);   
    const fUser = await User.findOne({userId : userId}) 
    const user = await User.findOneAndUpdate({userId : userId} , { $set: { amount: Number(amount) + Number(fUser.amount) } }, 
    { new: true } )
    // console.log("user ",user);
    // console.log("inside api",name , age)
    res.status(200).json({ person: user })
  }