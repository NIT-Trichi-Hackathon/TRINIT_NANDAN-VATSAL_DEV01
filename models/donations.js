// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    sender_name: { type: String },
    sender_email: { type: String, required: true },
    donationID: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    amount: { type: Number, required: true },
    receiver_name: { type: String },
    receiver_mail: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Donation", DonationSchema);
