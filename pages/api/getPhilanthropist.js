import Philanthropist from "@/models/Philanthropist";
import connectDB from "@/middleware/mongoose";

const handler = (handler) => async (req, res) => {
  let philanthropist = await Philanthropist.find();
  res.status(200).json({ philanthropist });
};

export default connectDB(handler);
