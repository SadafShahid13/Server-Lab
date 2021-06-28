const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.routes");

app.use(userRoutes);
app.get("/", (req,res) => {
    res.send("<H1>Home Page</H1>")
});

module.exports = app;