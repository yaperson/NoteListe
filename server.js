const express    = require('express')
const bodyParser = require("body-parser");
const path       = require('path');
const { title }  = require('process');
const { json }   = require('express/lib/response');
const fs         = require('fs');

const host = 'localhost'
const port = 5050

let app = express()

app.use(express.static(path.resolve(__dirname, "wwwroot")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.listen(port, host, () => {
  console.log(`Server is runing on http://${host}:${port}`)
})

app.get('/api/getNote', function (req, res) {

  const mysql = require('mysql');
  const dbConfig = require("./config/db.config");

  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB MySQL connected !");
    con.query("SELECT noteTitle, noteContent FROM notes", function (err, data) {
      if (err) {
        console.log("error: ", err);
      }
      console.log("tutorials: ", data);
      res.send(data)
    });
  });
});

app.post('/api/sendNote', function (req, res) {


  const data = JSON.parse(Object.keys(req.body));
  console.log(data)

  const mysql = require('mysql');
  const dbConfig = require("./config/db.config");

  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB MySQL connected !");

    con.query("INSERT INTO notes (noteTitle, noteContent) VALUE ('" + data.title + "', '" + data.content + "');", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });

  fs.appendFile( './notesFile/userName/' + data.title +'.txt', data.content, function (err) {
    if (err) throw err;
    console.log('Fichier créé !');
  });
});

app.put('/api/updateNote', function (req, res) {

  const mysql = require('mysql');
  const dbConfig = require("./config/db.config");

  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB MySQL connected !");

    const data = JSON.parse(Object.keys(req.body));
    //const data = req.body

    // let data = data
    console.log(data)

    con.query("UPDATE notes (noteTitle, noteContent) VALUE ('" + data.title + "', '" + data.content + "');", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });
});


// -- Users part

app.post('/api/newUser', function (req, res) {

  const mysql = require('mysql');
  const dbConfig = require("./config/db.config");

  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB MySQL connected !");

    const data = JSON.parse(Object.keys(req.body));
    //const data = req.body

    // let data = data
    console.log(data)

    con.query("INSERT INTO notes (userName, userMail, userPassword) VALUE ('" + data.USR_Name + "', '" + data.USR_Mail + "', '" + data.USR_Pwd + "');", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });
});

app.post('/api/connectUser', function (req, res) {

  const mysql = require('mysql');
  const dbConfig = require("./config/db.config");

  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB MySQL connected !");

    const data = JSON.parse(Object.keys(req.body));
    //const data = req.body

    // let data = data
    console.log(data)
    
    con.query("INSERT INTO notes (userName, userMail, userPassword) VALUE ('" + data.USR_Name + "', '" + data.USR_Mail + "', '" + data.USR_Pwd + "');", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });
});
