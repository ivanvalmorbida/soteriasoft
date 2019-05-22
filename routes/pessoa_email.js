var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/pessoa_email/gravar', gravar)
router.post('/pessoa_email/apagar', apagar)
router.post('/pessoa_email/pessoa', pessoa)
router.post('/pessoa_email/email', email)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body
  var emails = data.emails.toString()
  var email = data.emails

  connection.connect()
  emails="'"+emails.replace(',',"','")+"'"
  connection.query('delete from tb_pessoa_email where pessoa='+data.pessoa+' and email not in('+
  emails+')', function(err, rows) {
    var loop = function(email, i) {
      add_email(data.pessoa, email[i], function() {
        if (++i < email.length) {
          loop(email, i)
        } else {
          res.send({gravar: true})
        }
      })
    }
    loop(email, 0)
  })
}

function add_email(pessoa, email, cb){
  var connection = mysql.createConnection(settings.dbConect);
  connection.connect()
  connection.query('CALL sp_pessoa_email_add(?, ?)', 
  [pessoa, email], function(err, rows) {
    if (err){
      console.log('Error mensage: '+err)
    }
    cb()
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
      console.log('Error mensage: '+err)
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
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function email(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var email = req.body.email

  connection.connect()
  connection.query('SELECT e.pessoa, p.nome as pessoa_ from tb_pessoa_email e'+
  ' left join tb_pessoa p on p.codigo=e.pessoa where e.email=?', [email], 
  function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router