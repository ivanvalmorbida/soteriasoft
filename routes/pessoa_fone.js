var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/pessoa_fone/apagar', apagar)
router.post('/pessoa_fone/gravar', gravar)
router.post('/pessoa_fone/pessoa', pessoa)
router.post('/pessoa_fone/fone', fone)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body

  connection.connect()
  var fone = data.fones.toString()
  fone="'"+fone.replace(',',"','")+"'"
  connection.query('delete from tb_pessoa_fone where pessoa='+data.pessoa+' and fone not in('+
  fone+')', function(err, rows) {
    for (i = 0; i < data.fones.length; i++) {
      connection.query('SELECT pessoa from tb_pessoa_fone where pessoa=? and fone=?', 
      [data.pessoa, data.fones[i]], function(err, rows) {
        if (!err)
          if (rows.count==0) {
            connection.query('insert into tb_pessoa_fone (pessoa, fone) values (?, ?)',
            [data.pessoa, data.fones[i]], function(err, rows) {
              if (err)
                console.log('Error while performing Query.')
            })          
          }
        else
          console.log('Error while performing Query.')
      })
    }
  })
 
  /*connection.connect()
  connection.query('delete from tb_pessoa_fone where pessoa=?', 
  [data.pessoa], function(err, rows) {
    if (!err) {
      for (i = 0; i < data.fones.length; i++) {
        connection.query('insert into tb_pessoa_fone (pessoa, fone) values (?, ?)',
        [data.pessoa, data.fones[i]], function(err, rows) {
          if (err)
            console.log('Error while performing Query.')
        })    
      }
    }
  })*/
}

function apagar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('delete from tb_pessoa_fone where pessoa=?', 
  [data.pessoa], function(err, rows) {
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
  connection.query('SELECT * from tb_pessoa_fone where pessoa='+cod, function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function fone(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var fone = req.body.fone
  
  connection.connect()
  connection.query('SELECT f.pessoa, p.nome as pessoa_ from tb_pessoa_fone f'+
  ' left join tb_pessoa p on p.codigo=f.pessoa where f.fone=?', [fone], 
  function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router