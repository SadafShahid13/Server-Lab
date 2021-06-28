const mysql = require('mysql');
require(`dotenv`).config()

const getRegister = (req, res)=>{
    res.sendFile("registerPage.html", {root: "./views/users/"});    
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

    const sqlQuery = "INSERT INTO users (Email, Name, Gender, Password) VALUES ('" + email + "', '" + username + "', '" + gender + "', '" + password + "')";

    // console.log("Query= " + sqlQuery);

    db.query(sqlQuery, (err, result) => {
        if(err) {
            res.redirect('/register')
            throw err;
        }

        res.redirect('/dashboard');
        
    })

    db.release;
    
}