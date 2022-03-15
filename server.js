const express = require('express')
const bodyParser = require("body-parser");
const path = require('path');
const { title } = require('process');
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

    const con = mysql.createConnection({
        host: "host",
        user: "user",
        password: "mdp",
        database : "your database"
      });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB MySQL connected !");
        con.query("SELECT noteTitle, noteContent FROM notes", function (err, res) {
            if (err) throw err;
            console.log(res);
          });
      });
});
app.post('/api/sendNote', function (req, res) {
  const mysql = require('mysql');

  const con = mysql.createConnection({
      host: "mysql-yaperson.alwaysdata.net",
      user: "yaperson",
      password: "voltor123",
      database : "yaperson_notelist"
    });

  con.connect(function(err) {
      if (err) throw err;
      console.log("DB MySQL connected !");

      const data = JSON.parse(req.body);
      //const data = req.body

      // let data = data
      console.log(`${data}`)

      con.query("INSERT INTO notes (noteTitle, noteContent) VALUE ('"+data.title+"', '"+data.content+"');", function (err, res) {
        if (err) throw err;
        console.log(res);
      });
    });
});
