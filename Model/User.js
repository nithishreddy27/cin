import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      trim: true,
    },

    hash:{
      type:String
    },
    salt:{
      type:String
    },
    userId: {
      type :String
    },
    amount : {
      type:Number
    },
    userType:{
      type:String 
    },
    events:
       [ {
        name : {type:String},
        amount :{ type:Number},
        numberOfTickets : {type:Number}
      }]
    ,
    phoneNumber : {type:Number},
    eventName:{type:String},
    amountCollected:{type:Number},
    eventAmount:{type:Number},
    eventId:{type:Number},
    registrationDesk:{
      type:String
    },
   
  },
  { timestamps: true }
);



export default mongoose.models.users || mongoose.model("users", userSchema);
