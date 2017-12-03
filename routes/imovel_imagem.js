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
      connection.end();
    }
  });
}

exports.imovel = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query("SELECT codigo, ordem, concat('uploads/', arquivo) as arquivo"+
  " from tb_imovel_imagem where imovel="+cod+" order by ordem", function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
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
  connection.end();
}

exports.ordem = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;
  var dir = req.body.dir;
  var cla='';

  if (dir=='<'){cla='desc'}

  connection.connect();
  connection.query("SELECT ordem, imovel from tb_imovel_imagem where codigo="+cod, 
  function(err, row, fields) {
    if (!err) {
      var ord=row[0].ordem;
      var imo=row[0].imovel;

      connection.query("SELECT codigo from tb_imovel_imagem"+
      " where ordem"+dir+ord+" and imovel="+imo+" order by ordem "+cla+" LIMIT 1", 
      function(err, row, fields) {
        if (!err && row.length>0){
          connection.query('update tb_imovel_imagem set ordem='+ord+' where codigo='+row[0].codigo, function(err, rows, fields) {
            if (!err){
              dir = dir.replace('>','+');
              dir = dir.replace('<','-');
              connection.query('update tb_imovel_imagem set ordem=ordem'+dir+'1 where codigo='+cod, function(err, rows, fields) {
                if (!err){
                  res.json({dados: rows})
                }
                connection.end();
              });    
            }
            else{
              connection.end();
            }            
          });
        }
        else{
          connection.end();
        }
      })
    }
  })

}

//else {
//      console.log('Error while performing Query.');
//    }
//  });
//  connection.end();
//}
