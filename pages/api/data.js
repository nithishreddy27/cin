import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    
    const { amount , phone } = req.body;
    const date = new Date()
    const min = 10000
    const max = 200000
    const userId = Math.floor(Math.random()
        * (max - min + 1)) + min + ""+ date.getDate() + ""+date.getTime();
    console.log("user id ", userId , amount , phone);
    const person = User({
        userId : userId ,
        amount : amount ,
        userType: "user",
        phoneNumber: phone
    })
    await person.save()
    // console.log("inside api",name , age)
    res.status(200).json({ person: person })
  }