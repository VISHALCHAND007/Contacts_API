const mongoose = require("mongoose");

const contactModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the contact name."]
    },
    email: {
        type: String,
        required: [true, "Please provide the contact email address."],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please provide the contact phone number."]
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model("Contact", contactModel);