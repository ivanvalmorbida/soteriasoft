var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/cliente_imovel_loca/gravar', gravar)
router.post('/cliente_imovel_loca/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
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
      connection.end()
    } 
  })
}

function cliente(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod

  connection.connect()
  connection.query("SELECT l.estado, e.nome as estado_, l.cidade, c.Nome as cidade_,"+ 
  " l.bairro, b.nome as bairro_ FROM tb_cliente_imovel_localizacao as l"+
  " left join tb_estado as e on e.codigo=l.estado"+
  " left join tb_cidade as c on c.codigo=l.cidade"+
  " left join tb_bairro as b on b.codigo=l.bairro"+
  " where l.cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router