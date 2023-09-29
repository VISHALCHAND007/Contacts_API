const express = require("express");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnection");
const PORT = process.env.PORT || 5000;
dbConnect();
const server = express();


server.use(express.json());
server.use("/api/contacts", require("./route/contactRoute"));
server.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server started at port :${PORT}`);
});