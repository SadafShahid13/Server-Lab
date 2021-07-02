var bcrypt = require('bcrypt');
var saltRounds = process.env.SaltRounds;
const mysql = require('mysql');
require(`dotenv`).config()

const getRegister = (req, res)=>{
    res.sendFile("register.html", {root: "./views/users/"});    
}

const postRegister = (req, res)=>{

    const email = req.body.email;
    const username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    const gender = req.body.gender;

    if(password != password2){
        res.redirect('./');
        return;
    }
    
      // Create a connection to the mysql database
    const db = mysql.createConnection({
        host     : process.env.Host,
        user     : process.env.User,
        password : process.env.DBPass,
        database : process.env.DBName
    })
    
    password = password.toString();
    var salt = bcrypt.genSaltSync(parseInt(saltRounds));
    var hash = bcrypt.hashSync(password, salt);
    console.log(hash); //Store this in the db.

    const sqlQuery = "INSERT INTO users (email, Name, Gender, Password) VALUES ('" + email + "', '" + username + "', '" + gender + "', '" + hash + "')";

    // console.log("Query= " + sqlQuery);

    db.query(sqlQuery, (err, result) => {
        if(err) {
            res.redirect('/register')
            throw err;
        }

        res.redirect(307,'/dashboard');
        
    })

    db.release;
    
}

const getLogin = (req, res)=>{
    res.sendFile("login.html", {root:"./views/users/"});
}

const postLogin = (req, res)=>{
    res.redirect(307,'/dashboard');
}


const postDashBoard = (req, res)=>{
    const email = req.body.email;


    // Create a connection to the mysql database
    const db = mysql.createConnection({
        host     : process.env.Host,
        user     : process.env.User,
        password : process.env.DBPass,
        database : process.env.DBName
    })

    const sqlQuery = "SELECT Name FROM users WHERE Email='" + email + "'";

    db.query(sqlQuery, (err, result) => {
        if(err) throw err;
        res.send('<h1>Dash Board Page</h1> The username is ' + result[0].Name);
    })
}

module.exports = {getRegister, postLogin, postRegister, getLogin, postDashBoard}