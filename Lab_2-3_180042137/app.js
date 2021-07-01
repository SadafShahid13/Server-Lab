const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.routes");

app.use(userRoutes);
app.get("/", (req,res) => {
    res.send("<H1>Home Page</H1> <div><a href=/login> Login </a></div> <a href=/register> Register </a>")
});

module.exports = app;