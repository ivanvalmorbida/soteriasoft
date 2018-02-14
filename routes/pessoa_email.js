var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('delete from tb_pessoa_email where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      for (i = 0; i < data.emails.length; i++) {
        connection.query('insert into tb_pessoa_email (pessoa, email) values (?, ?)',
        [data.pessoa, data.emails[i]], function(err, rows) {
          if (err)
            console.log('Error while performing Query.')
        })
      }
    }
  })
}

exports.apagar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('delete from tb_pessoa_email where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      res.json({dados: rows})       
    }
    else
      console.log('Error while performing Query.')
  })
  connection.end();
}

exports.pessoa = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query('SELECT * from tb_pessoa_email where pessoa='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}
