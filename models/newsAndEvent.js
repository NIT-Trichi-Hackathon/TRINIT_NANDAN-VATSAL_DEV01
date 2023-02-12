// Starting mongoDB
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    news: { type: String, required: true},
    link: { type: String },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("news", newsSchema);

    // newsString --- string 
    // link : not necessary 
    // timestamps true
