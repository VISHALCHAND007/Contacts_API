const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controller/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current", auth, currentUser);
module.exports = userRouter;