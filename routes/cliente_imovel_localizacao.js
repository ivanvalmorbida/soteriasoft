var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/cliente_imovel_loca/gravar', gravar)
router.post('/cliente_imovel_loca/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body
  var local = data.local

  if(local.length>0){
    connection.connect()
    connection.query('update tb_cliente_imovel_localizacao set excluir=1 where cliente=?', 
    [data.cliente], function(err, rows) {
      var loop = function(local, i) {
        add_local(data.cliente, local[i], function() {
          if (++i < local.length) {
            loop(local, i)
          } else {
            connection.query('delete from tb_cliente_imovel_localizacao where excluir=1 and cliente=?', 
            [data.cliente], function(err, rows) {
              res.send({gravar: true})
            })
          }
        })
      }
      loop(local, 0)
    })
  }
}

function add_local(cliente, local, cb){
  var connection = mysql.createConnection(settings.dbConect);
  connection.connect()
  connection.query('CALL sp_cliente_imovel_loca_add(?, ?, ?, ?)', 
  [cliente, local.estado, local.cidade, local.bairro], function(err, rows) {
    if (err){
      console.log('Error while performing Query.')
    }
    cb()
  })
}



/*
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
*/

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