import User from "@/Model/User";
import connectDB from "../../src/lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    // console.log("db connected ");
    const {userId ,amount ,eventName , eventId, eventAmount ,numberOfTickets ,organiserEmail} = req.body
    
    const fUser = await User.findOne({userId : userId}) 
    if(fUser){

        // console.log("user id ",userId , amount , fUser.amount ,organiserEmail);  
        const updateData = {
        name: eventName,
        amount: eventAmount ,
        
    }; 
    
            if(Number(fUser.amount) - Number(eventAmount) >= 0){
        
        // console.log("isndie if ",Number(fUser.amount) - ( Number(numberOfTickets) * Number(amount)));
        const user = await User.findOneAndUpdate(
            {userId : userId} , 
            {
                $set: {amount: Number(fUser.amount)- Number(eventAmount)},
                 $push: {
                    events: updateData
                }
            },
            
            { new: true })
            // console.log("user inside ",user);
            
            const organiser = await User.findOneAndUpdate({email : organiserEmail} ,
                { $inc: { amountCollected:  Number(eventAmount) } }, 
                { new: true }, )
                res.status(200).json({ person: user })
            }
            else{

                console.log("inside insuffienet");
            
                res.status(200).json({error : "Insuffienet funds"})   
            }
            
        }
    else{
        res.status(200).json({error: "Invalid User"})
    }
}