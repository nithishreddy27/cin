// import User from "@/Model/User"
// import connectDB from "../lib/connectDB"

import User from "@/Model/User"
import connectDB from "../lib/connectDB"

export default async function handler(req, res) {

    await connectDB()
    switch(req.method){
        case "GET":
            console.log("inside get ",req.query.email)
            const user = await User.findOne({email: req.query.email})
            if(user){
                 res.status(200).json({ user: user })
            }
            else{
                 res.status(500).json({ error:"User Not Found" })

            }

    }
  }