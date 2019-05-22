var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')
var auth = require('../authetication')

router.post('/cliente_imovel_terr/gravar', gravar)
router.post('/cliente_imovel_terr/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('select cliente from tb_cliente_imovel_terreno where cliente=?', [data.cliente], 
  function(err, rows) {
    if (!err) {
      if (rows.length == 0) {
        connection.query('insert into tb_cliente_imovel_terreno (cliente, area_terreno, frente,'+ 
        ' fundo, lateral1, lateral2, gabarito, esquina) values (?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.cliente, data.area_terreno, data.frente, data.fundo, data.lateral1, data.lateral2, 
        data.gabarito, data.esquina], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error mensage: '+err)
        })
      }else {
        connection.query('update tb_cliente_imovel_terreno set area_terreno=?, frente=?,'+ 
        ' fundo=?, lateral1=?, lateral2=?, gabarito=?, esquina=? where cliente=?;', 
        [data.area_terreno, data.frente, data.fundo, data.lateral1, data.lateral2, 
        data.gabarito, data.esquina, data.cliente], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error mensage: '+err)
        })
      }   
    }
  })
}

function cliente(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query("SELECT * from tb_cliente_imovel_terreno where cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  });
  connection.end()
}

module.exports = router