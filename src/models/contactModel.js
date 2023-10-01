const mongoose = require("mongoose");

const contactModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please provide the contact name."]
    },
    email: {
        type: String,
        required: [true, "Please provide the contact email address."],
        unique: [true, "Email already registered."]
    },
    phone: {
        type: String,
        required: [true, "Please provide the contact phone number."]
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model("Contact", contactModel);