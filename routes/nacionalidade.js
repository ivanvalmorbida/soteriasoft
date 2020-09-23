var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/nacionalidade/nacionalidade_pais', nacionalidade_pais)

function nacionalidade_todas(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_nacionalidade order by pais', function(err, rows, fields) {
    if (!err)
      res.json({nacionalidade_todas: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function nacionalidade_pais(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo, pais from tb_nacionalidade"+
  " where pais like '"+txt+"%' order by pais LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router

/*
        var Schema = new mongoose.Schema({
          id: {type: Number},
          pais: {type: String},
          capital: {type: String},
          moeda: {type: String},
          idioma: {type: String}
        })
        */