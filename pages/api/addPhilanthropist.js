import Philanthropist from "@/models/Philanthropist";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Philanthropist({
        donationPreference: req.body[i].donationPreference,
        email: req.body[i].email,
        name: req.body[i].name,
        password: req.body[i].password,
        phoneNumber: req.body[i].phoneNumber,
      });
      await p.save();
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }

  let philanthropist = await Philanthropist.find();
  res.status(200).json({ philanthropist });
};

export default connectDB(handler);
