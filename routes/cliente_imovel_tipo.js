var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/cliente_imovel_tipo/gravar', gravar)
router.post('/cliente_imovel_tipo/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('delete from tb_cliente_imovel_tipo where cliente=?', [data.cliente], 
  function(err, rows) {
    if (!err) {
      for (i = 0; i < data.tipo.length; i++) {
        connection.query('insert into tb_cliente_imovel_tipo (cliente, tipo) values (?, ?);', 
        [data.cliente, data.tipo[i].tipo], function(err, rows) {
          if (err)
            console.log('Error while performing Query.')
        })        
      }
      connection.end()
    } 
  })
}

function cliente(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect();
  connection.query("SELECT c.tipo, t.descricao as tipo_"+ 
  " from tb_cliente_imovel_tipo as c"+
  " left join tb_imovel_tipo t on t.codigo=c.tipo where cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end()
}

module.exports = router