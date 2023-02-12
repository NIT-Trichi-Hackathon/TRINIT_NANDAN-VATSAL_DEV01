import donations from "../../models/donations";
import connectDB from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const token =req.body.token;
    const data=jwt.verify(token,process.env.JWT_Key)
    console.log(data.email)
    let mydonations = await donations.find({email:data.email})
    // console.log(mydonations)
  res.status(200).json({ mydonations });
};
export default connectDB(handler);