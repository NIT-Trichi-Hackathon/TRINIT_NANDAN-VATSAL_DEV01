import donations from "@/models/donations";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  let did = "";
  if (req.body.STATUS == "TXN_SUCCESS") {
    const donation = await donations.findOneAndUpdate(
      { donationID: req.body.ORDERID },
      { paymentInfo: JSON.stringify(req.body) }
    );
    did = donation._id;
    //Order.findByIdAndUpdate(order._id, {status:"Paid"})
  } else if (req.body.STATUS == "PENDING") {
    const order = await donations.findOneAndUpdate(
      { donationID: req.body.ORDERID },
      { paymentInfo: JSON.stringify(req.body) }
    );
    did = donation._id;
  }
  res.redirect("/", 200);
};

export default connectDB(handler);
