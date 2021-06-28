const express = require("express");
const router = express.router();

app.get("/login", (req,res) => {
    res.send("<H1>Login Page</H1>")
});

app.get("/register", (req,res) => {
    res.send("<H1>Register Page</H1>")
});

