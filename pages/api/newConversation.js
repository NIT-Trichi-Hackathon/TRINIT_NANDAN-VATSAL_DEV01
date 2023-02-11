import inboxParticipants from "@/models/inboxParticipants";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
    console.log(req.body);
  if (req.method == "POST") {
    let n = new inboxParticipants({
      members: req.body.members,
      inboxUID: req.body.inboxUID,
    });
    await n.save();
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }

  let response = await inboxParticipants.find();
  res.status(200).json({ response });
};

export default connectDB(handler);
