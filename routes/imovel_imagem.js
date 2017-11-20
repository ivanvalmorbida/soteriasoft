var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, 'foto_imovel_' + datetimestamp 
        + '.' + file.originalname.split('.')
        [file.originalname.split('.').length -1]);
    }
});
var upload = multer({ storage: storage }).single('file');

exports.adicionar =  function(req, res, next) {
  upload(req, res, function(err){
    if(!err){
      var connection = mysql.createConnection(settings.dbConect);
  
      connection.connect();
      connection.query('insert into tb_imovel_imagem (imovel,arquivo,ordem)'+
      ' select ? as imovel, ? as arquivo, ifnull(max(ordem),0)+1 as ordem'+
      ' from tb_imovel_imagem where imovel=?', 
      [req.body.imovel, req.file.filename, req.body.imovel], function(err, rows) {
        if (!err)
          res.json({codigo: rows.insertId})            
        else
          console.log('Error while performing Query: '+err)
      });
    }
  });
}

exports.imovel = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
connection.query("SELECT codigo, ordem, concat('uploads/', arquivo) as arquivo from tb_imovel_imagem where imovel="+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
}

exports.remover = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query('Delete from tb_imovel_imagem where codigo='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
}
