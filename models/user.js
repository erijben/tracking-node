const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: String,
        required: true,
        unique: true

    },
    role: {
        type: String,
        enum: ["admin", "adminSystem", "technicienReseaux"],
        default: "technicienReseaux"
    }
});

module.exports = mongoose.model('User', userSchema);
