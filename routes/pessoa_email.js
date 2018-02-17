var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/pessoa_email/gravar', gravar)
router.post('/pessoa_email/apagar', apagar)
router.post('/pessoa_email/pessoa', pessoa)
router.post('/pessoa_email/email', email)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('delete from tb_pessoa_email where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      for (i = 0; i < data.emails.length; i++) {
        connection.query('insert into tb_pessoa_email (pessoa, email) values (?, ?)',
        [data.pessoa, data.emails[i]], function(err, rows) {
          if (err)
            console.log('Error while performing Query.')
        })
      }
    }
  })
}

function apagar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('delete from tb_pessoa_email where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      res.json({dados: rows})       
    }
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function pessoa(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query('SELECT * from tb_pessoa_email where pessoa='+cod, function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function email(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var email = req.body.email

  connection.connect();
  connection.query('SELECT * from tb_pessoa_email where email=?', [email], 
  function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router