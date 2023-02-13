import Philanthropist from "@/models/Philanthropist";
import Ngo from "@/models/Ngo";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => 
{
  if (req.method == "POST") 
  {
    const jwt = require('jsonwebtoken');
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_Key);
    // console.log(data.email)

    if(data.category)
    {
        const userDetails = await Philanthropist.findOne({email: data.email});
        res.status(200).json({ userDetails:userDetails , category:true});
    }
    else if(!data.category)
    {
        const userDetails = await Ngo.findOne({email: data.email});
        res.status(200).json({ userDetails:userDetails , category:false});
    }
    else {
        res.status(400).json({ error: "Error in category" });}
    // const user = await User.findOne({ email: data.email });
    // console.log(user);
    // res.status(200).json({ user });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler);