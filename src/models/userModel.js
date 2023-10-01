const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Please provide the username."]
    }, 
    email: {
        type: String, 
        required: [true, "Please provide the email."], 
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, "Please provide the password."]
    }
}, {
    timeStamps: true
});
module.exports = mongoose.model("User", userSchema);