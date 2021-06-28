const express = require("express");
const router = express.Router();

router.get("/login.html", (req,res) => {
    res.sendFile("login.html",{root:"./views/users"})
});

router.get("/register.html", (req,res) => {
    res.sendFile("register.html",{root:"./views/users"})
});

router.get("/dashboard.html", (req,res) => {
    res.sendFile("dashboard.html",{root:"./views/users"})
});

module.exports = router;