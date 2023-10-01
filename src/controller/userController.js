const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
@Route: POST- /api/register
@Description: used to register the user
@Access: public
*/
const registerUser = asyncHandler(async (req, res) => {
    /* 
    1. Check if user already exists
    2. if not then create the hashed password
    3. create user
    4. return the required information
    */
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //1.
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email provided is already taken.");
    }
    //2.
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    //3.
    const user = userModel.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(user);
    // //creating token
    // const token = await jwt.sign({}, process.env.SECRET_KEY);
    //4.
    if (user) {
        res.status(201);
        res.json({
            message: "User created successfully.",
            userId: user.id,
            email: email,
            // token: token
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid.")
    }
});

/*
@Route: POST- /api/login
@Description: used for user login
@Access: public
*/
const loginUser = asyncHandler(async (req, res) => {
    /*
    1. check if user exists
    2. if true, then match the password with the hashed password
    3. if matched, then create the validation token
    4. send the appropriate response accordingly
    */
    const { email, password } = req.body;
    //1.
    const user = await userModel.findOne({ email });
    //2 & 3 combined
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            User: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.SECRET_KEY,
            { expiresIn: "15m" });
        res.status(200).json({ token });
    } else {
        res.status(401);
        throw new Error("Credentials provided are not valid.");
    }
});

/*
@Route: GET- /api/current
@Description: used to get the current user details
@Access: private
*/
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };