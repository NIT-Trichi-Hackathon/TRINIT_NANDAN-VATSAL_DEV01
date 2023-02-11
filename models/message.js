// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    inboxUID: { type: String, required: true},
    senderEmail: { type: String, required: true},
    message: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("message", messageSchema);
