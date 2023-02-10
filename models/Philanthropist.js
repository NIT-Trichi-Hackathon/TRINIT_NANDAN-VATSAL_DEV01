// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const PhilanthropistSchema = new mongoose.Schema(
  {
    donationPreference: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Philanthropist", PhilanthropistSchema);
