const express = require('express');
const { use } = require('../app');
const userRoutes = express.Router();

const {
    getRegister, 
    getLogin,
    postLogin, 
    postRegister,
    getLanding,
    getDashboard
} = require("./../controllers/userControllers")

userRoutes.get("/",getLanding);
userRoutes.get("/dashboard",getDashboard)
userRoutes.get("/users/login",getLogin);
userRoutes.post("/users/login",postLogin);
userRoutes.get("/users/register",getRegister);
userRoutes.post("/users/register",postRegister);
userRoutes.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
})


module.exports = userRoutes;