const mysql = require('mysql');
const isLoggedIn = require('../middleware/auth.middleware');
require(`dotenv`).config()

const getRegister = (req, res)=>{
    res.sendFile("register.html", {root: "./views/users/"});    
}

const postRegister = (req, res)=>{

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
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

    const sqlQuery = "INSERT INTO users (email, Name, Gender, Password) VALUES ('" + email + "', '" + username + "', '" + gender + "', '" + password + "')";

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