const express = require('express');
const userRoutes = express.Router();

const {
    getRegister, 
    getLogin,
    postLogin, 
    postRegister,
    getLanding
} = require("./../controllers/userControllers")

userRoutes.get("/",getLanding);
userRoutes.get("/users/login",getLogin);
userRoutes.post("/users/login",postLogin);
userRoutes.get("/users/register",getRegister);
userRoutes.post("/users/register",postRegister);


module.exports = userRoutes;