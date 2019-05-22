var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/cbo/cbo_descricao', cbo_descricao)
router.get('/cbo/cbo_todos', cbo_todos)

function cbo_todos(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_cbo order by descricao', function(err, rows, fields) {
    if (!err)
      res.json({cbo_todos: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cbo_descricao(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select cbo, descricao from tb_cbo"+
  " where descricao like '"+txt+"%' order by descricao LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router