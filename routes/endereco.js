var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/endereco/endereco_nome', endereco_nome)
router.get('/endereco/endereco_cidade_nome', endereco_cidade_nome)

function endereco_todos(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('select codigo,nome from tb_endereco order by nome', function(err, rows) {
    if (!err) 
      res.json({endereco_todos: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function endereco_cidade(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body

  connection.connect()
  connection.query('Select en.codigo, en.nome from tbcep as ce'+
  ' inner join tb_endereco as en on ce.endereco=en.codigo'+
  ' where ce.uf=? And ce.cidade=? group by en.codigo, en.Nome'+
  ' order by en.Nome;', [data.uf, data.ci], function(err, rows) {
    if (!err) 
      res.json({endereco_cidade: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function endereco_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo,nome from tb_endereco Where nome like '%"+
  txt+"%' order by Nome LIMIT 20;", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function endereco_cidade_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt
  var est = req.query.est
  var cid = req.query.cid

  connection.connect()
  connection.query("select en.codigo, en.nome from tb_endereco as en"+
  " where en.codigo in(select endereco from tb_cep where estado=? and cidade=?)"+
  " and en.nome like '"+txt+"%' order by en.nome LIMIT 20", 
  [est, cid], function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router