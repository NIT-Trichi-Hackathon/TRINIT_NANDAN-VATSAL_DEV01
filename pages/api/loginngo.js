import Ngo from "@/models/Ngo";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => 
{
    if (req.method == "POST") 
    {
      //console.log(req.body)
      let ngoUser = await Ngo.findOne({ email: req.body.email });
      if (ngoUser) 
      {
        //console.log(decryptedPassword);
        if (
          req.body.email == ngoUser.email &&
          req.body.password == ngoUser.password
        )
        
        {
          const jwt = require('jsonwebtoken');
          var token = jwt.sign({ email: ngoUser.email, name: ngoUser.name, category: false }, process.env.JWT_Key , { expiresIn: '3d' });
          res
            .status(200)
            .json({ success: true, token:token, category:false });
        } else {
          res.status(200).json({ success: false, error: "Invalid Password" });
        }
      } else {
        res.status(200).json({ success: false, error: "User Not Found" });
      }
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  };
  
  export default connectDB(handler);