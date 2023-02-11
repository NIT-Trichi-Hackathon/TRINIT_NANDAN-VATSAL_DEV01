import connectDB from "@/middleware/mongoose";
import message from "@/models/message";

const handler = async (req, res) => 
{
    
    
    const jwt = require('jsonwebtoken')
    var decoded = jwt.verify(req.body.token, process.env.JWT_Key);
    // console.log(decoded.email) // bar
    // console.log(req.body);
  if (req.method == "POST") {
    let n = new message({
        inboxUID: req.body.inboxUID,
        senderEmail: decoded.email,
        message : req.body.message,
    });
    await n.save();
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }

  let response = await message.find();
  res.status(200).json({ response });
};

export default connectDB(handler);
