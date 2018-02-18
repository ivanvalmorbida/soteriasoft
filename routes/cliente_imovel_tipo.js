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
      for (i = 0; i < data.local.length; i++) {
        connection.query('insert into tb_cliente_imovel_tipo (cliente, tipo) values (?, ?);', 
        [data.cliente, data.local[i].tipo], function(err, rows) {
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
  connection.query("SELECT case when tipo=4 then 'Geminado' when tipo=3 then 'Apartamento'"+
  " when tipo=2 then 'Casa padrão' when tipo=1 then 'Terreno' when tipo=5 then 'Rural' end as tipo_"+ 
  " from tb_cliente_imovel_tipo as c where cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end()
}

module.exports = router