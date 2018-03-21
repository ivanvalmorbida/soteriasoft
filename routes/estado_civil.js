var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/estado_civil/estado_civil_descricao', estado_civil_descricao)

function estado_civil_todos(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_estado_civil order by descricao', function(err, rows, fields) {
    if (!err)
      res.json({estado_civil_todos: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function estado_civil_descricao(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo, descricao from tb_estado_civil"+
  " where descricao like '"+txt+"%' order by descricao LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router