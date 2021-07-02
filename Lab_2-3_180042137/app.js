const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
    session({
        secret:'secret',
        resave:true,
        saveUninitialized:true
    })
);

app.use(
    flash()
);

app.use(express.urlencoded({extended:false}))

const userRoutes = require("./routes/userRoutes.routes");
app.use(userRoutes);


module.exports = app;