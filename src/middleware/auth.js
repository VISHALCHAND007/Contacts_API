const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler((req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedInfo) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized.");
            }
            //set the info to the req
            // console.log(decodedInfo);
            req.user = decodedInfo.User;
            next();
            if (!token) {
                res.status(401);
                throw new Error("Token is missing.");
            }
        })
    }
});
module.exports = auth;