var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var auth = require('../authetication');

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('delete from tb_cliente_imovel_localizacao where cliente=?', [data.cliente], 
  function(err, rows) {
    if (!err) {
      for (i = 0; i < data.local.length; i++) {
        connection.query('insert into tb_cliente_imovel_localizacao (cliente, estado, cidade,'+ 
        ' bairro) values (?, ?, ?, ?);', [data.cliente, data.local[i].estado, data.local[i].cidade, 
        data.local[i].bairro], function(err, rows) {
          if (err)
            console.log('Error while performing Query.')
        });        
      }
      connection.end();
    } 
  })
}

exports.cliente = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query("SELECT * from tb_cliente_imovel_localizacao where cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}
