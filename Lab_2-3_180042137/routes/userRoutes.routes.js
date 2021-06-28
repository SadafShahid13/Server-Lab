const express = require('express');
const userRoutes = express.Router();
const bodyParser = require('body-parser')
const isLoggedIn = require('./../middleware/auth.middleware');

const {
    getRegister, 
    postLogin, 
    postRegister, 
    getLogin,
    postDashBoard
} = require("./../controllers/userControllers.js")

userRoutes.use(bodyParser.urlencoded({extended: false}));
userRoutes.use(bodyParser.json());

userRoutes.get("/login", getLogin);

userRoutes.post("/login", isLoggedIn, postLogin);

userRoutes.post("/dashboard", isLoggedIn, postDashBoard);

userRoutes.get("/dashboard", (req,res) =>{
    res.send("<h1>You need to Login or Register to access the Dashboard</h1> <div><a href=/login> Login </a></div> <a href=/register> Register </a>");
})

userRoutes.get("/register", getRegister);

userRoutes.post("/register", postRegister);

module.exports = userRoutes;