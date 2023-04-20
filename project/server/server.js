const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
 });
app.use(express.json({limit:'10mb'}))

let db = new sqlite3.Database('login.db', (err) => {
    if (err){
        console.error(err.message);
    }
    console.log('Connecte au base de donnes');
})


app.post('/validatePassword', (req, res) => {
    const {username , password } = req.body
    console.log("Username="+username+" Password="+password);

    const sqlLogare = `select * from Users where email= '${username}' and password= '${password}'`;
    console.log(sqlLogare);
    db.all(sqlLogare , (err, rows) =>{
        if(err){
            throw err;  
        }
        if(rows.length >0 ){
            res.send(
                { 
                    validation: true, 
                    id_user: rows[0].id_user,
                    lastname: rows[0].lastname
                });
        } else{
            res.send({validation:false})
        }
    })
})
app.post('/createUser', (req, res) => {
    const {firstname, lastname, email, nr_tel, username, password } = req.body
    const sql = `insert into Users (firstname, lastname, email, nr_tel, password) values ( '${firstname}', '${lastname}' , '${email}' , '${nr_tel}' , '${password}')`;
    console.log(sql)
    db.run(sql, (err)=>{
        if(err){
            throw err;  
        }else{
            res.send("User created ")

        } 
      })
})


app.listen(3001, () => console.log('Listening at port 3001'))
