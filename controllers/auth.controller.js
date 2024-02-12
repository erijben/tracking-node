const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const User= require("../models/user");
require('dotenv').config()

async function signUp(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "missing statment" });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email/username already exists" });
        }
        const crytptedPass  = await bcrypt.hash(password, 10);
        console.log(password)
        console.log(crytptedPass)
        const newUser = new User({ username, email, password: crytptedPass });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
       console.log(savedUser)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}
async function Login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json("Wrong credentials - User not found");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).json("Wrong credentials - Incorrect password");
        }

        const accessToken = JWT.sign({
            id: user._id,
            role:user.role
        }, "process.env.JWT_KEY", { expiresIn: "3d" });

        // Send the response with the user details and access token
        res.status(200).json({ ...user._doc,accessToken });
        
    } catch (err) {
        // Handle unexpected errors with a 500 status code
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}


module.exports={signUp,Login}