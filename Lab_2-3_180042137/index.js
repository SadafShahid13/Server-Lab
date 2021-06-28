require(`dotenv`).config()
const app = require('./app');
const mysql = require('mysql');
const PORT = process.env.PORT;


const connection = mysql.createConnection({
    host     : process.env.Host,
    user     : process.env.User,
    password : process.env.DBPass,
    database : process.env.DBName
  });

connection.connect((err)=>{
    if(!err)
    {
        console.log(`Connected`)
        app.listen(PORT, () => {
            console.log(`server is running at PORT ${PORT}`);
        });
    }
    else
    {
        console.log(`Connection Failed`)
    }
})

module.exports = app;