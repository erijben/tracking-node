const mongoose = require("mongoose");



const PingSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },

    body:{
        type: String,
        required: true,
    },

    Ping_image: {
        type: String,
        required: false,
    },

    date:{
        type: Date,
        default: Date.now(),
        required:false
    }

});

module.exports = mongoose.model("Ping", PingSchema);