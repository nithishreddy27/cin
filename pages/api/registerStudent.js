import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    console.log("db connected ");
    const {userId ,amount ,eventName , eventId, eventAmount ,numberOfTickets ,organiserEmail} = req.body
    
    const fUser = await User.findOne({userId : userId}) 
    console.log("user id ",userId , amount , fUser.amount ,organiserEmail);  
    const updateData = {
        name: eventName,
        amount: eventAmount * numberOfTickets,
        numberOfTickets: numberOfTickets
    }; 
    
    if(Number(fUser.amount) - ( Number(numberOfTickets) * Number(amount)) >= 0){

        // console.log("isndie if ",Number(fUser.amount) - ( Number(numberOfTickets) * Number(amount)));
        const user = await User.findOneAndUpdate(
            {userId : userId} , 
            {
                 $set: {amount: Number(fUser.amount)- Number( Number(numberOfTickets) * Number(amount))},
                 $push: {
                    events: updateData
                }
                },
            
            { new: true })
            // console.log("user inside ",user);

        const organiser = await User.findOneAndUpdate({email : organiserEmail} ,
            { $inc: { amountCollected: Number(numberOfTickets) * Number(amount) } }, 
            { new: true }, )
    res.status(200).json({ person: user })
    }
    else{
     res.status(200).json({error : "Insuffienet funds"})   
    }
  
  }