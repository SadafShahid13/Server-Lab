// Create a connection to the mysql database
require(`dotenv`).config()
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : process.env.Host,
    user     : process.env.User,
    password : process.env.DBPass,
    database : process.env.DBName
})

var bcrypt = require('bcrypt');
const userRoutes = require('../routes/userRoutes.routes');

var saltRounds = process.env.SaltRounds;

const getLogin = (req,res) => {
    res.render("users/login.ejs");
};

const postLogin = (req,res) => {
    var {email, password} = req.body;
    console.log(email);
    console.log(password);
};

const getRegister = (req,res) => {
    res.render("users/register.ejs", {errors:req.flash('errors')});
};

const postRegister = (req,res) => {
    var {name, email, password, password2} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(password2);

    const errors = []
    if(!name || !email || !password || !password2){
        errors.push("All fields are required!");
    }

    if(password.length < 6){
        errors.push("Password must be atleast 6 characters");
    }
    
    if(password!=password2){
        errors.push("Passwords do not match");
    }

    if(errors.length>0){
        req.flash("errors",errors)
        res.redirect("/users/register")
    }
    else{
        //create new user
        var sqlQuery = "SELECT Name FROM users WHERE Email='" + email + "'";
            db.query(sqlQuery, (err, result) =>{
                if(result.length!=0) {
                    errors.push("This email is already assigned to a user");
                    req.flash("errors",errors)
                    res.redirect("/users/register")
                }
                else{
                    password = password.toString();
                    var salt = bcrypt.genSaltSync(parseInt(saltRounds));
                    var hash = bcrypt.hashSync(password, salt);
                    console.log(hash); //Store this in the db.
                    sqlQuery = "INSERT INTO users (email, Name, Password) VALUES ('" + email + "', '" + name + "', '" + hash + "')";
                    db.query(sqlQuery, (err, result) => {
                        if(err) {
                            res.redirect('/users/register')
                            throw err;
                        }
                        res.redirect('/users/login');
                    })
                    db.release;
                }
            })
    }
};

const getLanding = (req,res) => {
    res.render("users/landing.ejs");
};

module.exports = {
    getRegister, 
    postLogin, 
    postRegister, 
    getLogin,
    getLanding}