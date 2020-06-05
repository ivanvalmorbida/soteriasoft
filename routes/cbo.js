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

/*
function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select * from tb_cbo order by Descricao;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          cbo: {type: String},
          descricao: {type: String}
        })
        var CBO = mongoose.model('CBO', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].CBO)
          a = new CBO({
            cbo: rows[i].CBO,
            descricao: rows[i].Descricao
          })    
          a.save()
        }
      })
      .catch(err => console.log(err))
    }
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}
*/