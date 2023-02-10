import Philanthropist from "@/models/Philanthropist";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
      let p = new Philanthropist({
        donationPreference: req.body.donationPreference,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
      });
      await p.save();
    
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }

  let philanthropist = await Philanthropist.find();
  res.status(200).json({ philanthropist });
};

export default connectDB(handler);
