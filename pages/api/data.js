import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    
    const { amount , phone , registerDesk} = req.body;
    console.log("desk ",registerDesk);
    const date = new Date()
    const min = 10000
    const max = 200000
    const userId = Math.floor(Math.random()
        * (max - min + 1)) + min + ""+ date.getDate() + ""+date.getTime();
    // console.log("user id ", userId , amount , phone);

    const registerUser = await User.findOne({registrationDesk : registerDesk})
    // console.log("registrationDesk ",registerDesk);
    const registerUserResponse = await User.findOneAndUpdate({registrationDesk :registerDesk} , {$set:{
        amountCollected : Number(registerUser.amountCollected) + Number(amount) 
    }})
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