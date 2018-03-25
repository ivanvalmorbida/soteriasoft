var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/cliente_imovel_tipo/gravar', gravar)
router.post('/cliente_imovel_tipo/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body
  var tipos = data.tipos.toString()
  var tipo = data.tipos

  if(tipo.length>0){
    connection.connect()
    tipos="'"+tipos.replace(',',"','")+"'"
    connection.query('delete from tb_cliente_imovel_tipo where cliente='+data.cliente+' and tipo not in('+
    tipos+')', function(err, rows) {
      var loop = function(tipo, i) {
        add_tipo(data.cliente, tipo[i].codigo, function() {
          if (++i < tipo.length) {
            loop(tipo, i)
          } else {
            res.send({gravar: true})
          }
        })
      }
      loop(tipo, 0)
    })
  }
}

function add_tipo(cliente, tipo, cb){
  var connection = mysql.createConnection(settings.dbConect);
  connection.connect()
  connection.query('CALL sp_cliente_imovel_tipo_add(?, ?)', 
  [cliente, tipo], function(err, rows) {
    if (err){
      console.log('Error while performing Query.')
    }
    cb()
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