var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/imovel_tipo/todos', tipo_todos)

function tipo_todos(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_imovel_tipo order by descricao', function(err, rows, fields) {
    if (!err)
      res.json({tipo_todos: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router