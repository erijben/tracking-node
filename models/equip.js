const mongoose = require("mongoose");
const PingSchema = require("./Ping");

const equipSchema = new mongoose.Schema({

    Nom:{
        type: String,
        required: true,
    },

    Type:{
        type: String,
        required: true,
    },

    AdresseIp: {
        type: String,
        required: false,
    },

    Departement:{
        type: String ,
        required:false
    },
 
  
    Emplacement : {
        type: String,
        required: false,
    },
    Etat:{
        type: String,
        required: false,
    }

});





module.exports = mongoose.model("equip", equipSchema);