// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const inboxParticipantsSchema = new mongoose.Schema(
  {
    members: [String],
    inboxUID: { type: String, required: true},
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("inboxParticipants", inboxParticipantsSchema);
