// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const NgoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    endGoal: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    target: { type: String, default: "" },
    location: { type: String, default: "" },
    history: [String],
    futurePlans: [String],
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Ngo", NgoSchema);
