import Ngo from "@/models/Ngo";
import connectDB from "@/middleware/mongoose";
import newsAndEvent from "@/models/newsAndEvent";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let n = new Ngo({
      email: req.body.email,
      endGoal: req.body.endGoal,
      name: req.body.name,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      target: req.body.target,
      location: req.body.location,
      history: req.body.history,
      futurePlans: req.body.futurePlans,
    });
    await n.save();
    
    const newsMSG = `A new NGO was found under the name ${req.body.name} that targets the area of ${req.body.target}. Its end goal is ${req.body.endGoal}. All donations are appretiated.`;
    // console.log(newsMSG);
    const news = newsAndEvent({
      news:newsMSG,
  });
  await news.save();

  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }

  let ngo = await Ngo.find();
  res.status(200).json({ ngo });
};

export default connectDB(handler);
