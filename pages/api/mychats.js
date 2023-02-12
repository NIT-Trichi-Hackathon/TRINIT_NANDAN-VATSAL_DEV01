import inbox from "@/models/inbox";
import connectDB from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const token =req.body.token;
    const data=jwt.verify(token,process.env.JWT_Key)
    // console.log(data.email)
    let mychats = await inbox.find({userEmail:data.email})
    // console.log(mydonations)
  res.status(200).json({ mychats });
};
export default connectDB(handler);