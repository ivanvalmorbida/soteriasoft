var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/pessoa_juridica/gravar', gravar)
router.post('/pessoa_juridica/pessoa', pessoa)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('select pessoa from tb_pessoa_juridica where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      if (rows.length == 0) {
        connection.query('insert into tb_pessoa_juridica (pessoa, razaosocial,'+
        'cnpj, incricaoestadual, atividade, homepage, representante)'+
        ' values (?, ?, ?, ?, ?, ?, ?)', [data.pessoa, data.razaosocial,
        data.cnpj, data.incricaoestadual, data.atividade, data.homepage,
        data.representante], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error while performing Query.')
        })
      }   
      else {
        connection.query('update tb_pessoa_juridica set razaosocial=?, cnpj=?,'+
        'incricaoestadual=?, atividade=?, homepage=?, representante=? where pessoa=?', 
        [data.razaosocial, data.cnpj, data.incricaoestadual, data.atividade, 
        data.homepage, data.representante, data.pessoa], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error while performing Query.')
        })
      }     
    }
    else
      console.log('Error while performing Query.')
  })
}

function pessoa(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query('select p.*, a.descricao as atividade_, r.nome as representante_'+
  ' from tb_pessoa_juridica p'+
  ' left join tb_atividade_economica a on a.codigo=p.atividade'+
  ' left join tb_pessoa r on r.codigo=p.representante where p.pessoa='+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

module.exports = router