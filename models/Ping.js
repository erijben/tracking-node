
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pingResult = new Schema({
    size: {
      type: Number,
      required: true,
    },
    temps: {
      type: Number,
      required: true,
    },
    TTL: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
});
// ping.js
module.exports = mongoose.model("PingResult", pingResult);
