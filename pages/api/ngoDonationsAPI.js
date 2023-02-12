import donations from "../../models/donations";
import connectDB from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    console.log(req.body.email)
    let ngoDonations = await donations.find({receiver_mail:req.body.email})
    console.log(ngoDonations)
  res.status(200).json({ ngoDonations });
};
export default connectDB(handler);