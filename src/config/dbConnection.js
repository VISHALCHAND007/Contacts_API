const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION);
        console.log(`Connected to : ${(connect.connection.name)}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = dbConnect;