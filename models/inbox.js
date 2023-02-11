// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true},
    inboxUIDs: [String],
  },
);

mongoose.models = {};
export default mongoose.model("inbox", inboxSchema);
