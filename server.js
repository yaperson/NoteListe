const express    = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const path       = require('path');
const { title }  = require('process');
const { json }   = require('express/lib/response');
const fs         = require('fs');

const host = 'localhost'
const port = 5050

let app = express()


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(path.resolve(__dirname, "wwwroot")));
app.use(bodyParser.urlencoded({ extended: true }));
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

    con.query("INSERT INTO notes (`noteTitle`, `noteContent`, `noteUID`, `userId`) VALUES ('" + data.title + "', '" + data.content + "', '" + data.noteUID + "', '" + 1 + "');", function (err, res) {
      if (err) throw err;
      console.log(res);
    });
  });

  fs.appendFile( './notesFile/userName/' + data.title +'-'+ data.noteUID + '.txt', data.content, function (err) {
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

    const data = req.body;
    console.log(data)

    con.query("INSERT INTO users (userMail, userPassword, userName) VALUES ('"+ data.usrMail + "', '" + data.usrPwd + "', '" + data.usrName + "');", function (err, res) {
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

    const data = req.body;
    console.log(data)
    
    if (data.usrMail && data.usrPwd) {
      con.query('SELECT * FROM users WHERE userMail = ? AND userPassword = ?', [data.usrMail, data.usrPwd], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = data.usrMail;
          res.redirect(this.shell.gotoView('/views/notes-list.js'));
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();
      });
    }
  });
});
