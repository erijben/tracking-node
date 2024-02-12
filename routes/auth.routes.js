const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const controtller= require('../controllers/auth.controller')
// const { usersAuth } = require("../dbAuth")
const User= require("../models/user");
router.post('/signup', controtller.signUp)
router.post('/login', controtller.Login)
// ALL USER
router.get("/all", async (req, res) => {
const users = await User.find()
    res.json(users)
})

module.exports = router

