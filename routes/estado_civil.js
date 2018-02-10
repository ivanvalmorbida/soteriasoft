var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.estado_civil_todos = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);

  connection.connect();
  connection.query('SELECT * from tb_estado_civil order by descricao', function(err, rows, fields) {
    if (!err)
      res.json({estado_civil_todos: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}

exports.estado_civil_descricao = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var txt = req.query.txt;

  connection.connect();
  connection.query("select codigo, descricao from tb_estado_civil"+
  " where descricao like '"+txt+"%' order by descricao LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}