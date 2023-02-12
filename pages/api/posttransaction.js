import donations from "@/models/donations";
import newsAndEvent from "@/models/newsAndEvent";
import connectDB from "../../middleware/mongoose";


const handler = async (req, res) => {
  let did = "";
  if (req.body.STATUS == "TXN_SUCCESS") {
    const donation = await donations.findOneAndUpdate(
      { donationID: req.body.ORDERID },
      { paymentInfo: JSON.stringify(req.body) }
    );
    // console.log(donation);
    const newsMSG = `${donation.sender_name} donated the amount of ₹ ${donation.amount} to ${donation.receiver_mail} ` 
    console.log(newsMSG);
    const news = newsAndEvent({
      news:newsMSG,
  });
  await news.save();
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
