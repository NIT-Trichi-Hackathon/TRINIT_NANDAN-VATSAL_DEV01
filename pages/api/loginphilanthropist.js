import Philanthropist from "@/models/Philanthropist";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => 
{
    if (req.method == "POST") 
    {
      //console.log(req.body)
      let philanthropist = await Philanthropist.findOne({ email: req.body.email });
      if (philanthropist) 
      {
        //console.log(decryptedPassword);
        if (
          req.body.email == philanthropist.email &&
          req.body.password == philanthropist.password
        )
        
        {
          const jwt = require('jsonwebtoken');
          var token = jwt.sign({ email: philanthropist.email, name: philanthropist.name }, process.env.JWT_Key , { expiresIn: '3d' });
          res
            .status(200)
            .json({ success: true, token:token });
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