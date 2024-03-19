import User from "@/Model/User";
import connectDB from "@/src/lib/connectDB";
import crypto from "crypto";

export default async (req, res) => {
    await connectDB()
  if (req.method === 'POST') {

    console.log("inside post");
    
    const { username,
      password,
      firstName,
      lastName,
      eventName,
      eventId,
      eventAmount
    } = req.body;
      // console.log(username,password,firstName,lastName,eventName,
      //   eventId,
      //   eventAmount)
      const email = username
      const existingUser = await User.findOne({ email });
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
      if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
      }
      else{
        const newUser = new User({ 
           email, 
           hash ,
           salt,
           profile:{
            firstName,
            lastName},
            eventName,
      eventId,
      eventAmount,
      userType: "organiser"
          }); 
        await newUser.save();
      }

    }
  return res.status(200).send({done:true})
};
