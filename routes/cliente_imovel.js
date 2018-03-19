var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')
var auth = require('../authetication')

router.get('/cliente_imovel', index)
router.get('/cliente_imovel/dlg/apagar', dlg_apagar)
router.get('/cliente_imovel/dlg/localizar', dlg_localizar)
router.post('/cliente_imovel/codigo', codigo)
router.post('/cliente_imovel/pessoa', pessoa)
router.post('/cliente_imovel/gravar', gravar)
router.post('/cliente_imovel/localizar', localizar)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('cliente_imovel', {empresa: settings.empresa})
}

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  
  if (data.codigo==0) {
    connection.query('insert into tb_cliente_imovel (pessoa, interesse,'+
    ' origem, responsavel, cadastro) values (?, ?, ?, ?, now());', 
    [data.pessoa, data.interesse, data.origem, data.responsavel], function(err, rows) {
      if (!err)
        res.json({codigo: rows.insertId})      
      else
        console.log('Error while performing Query: '+err)
    })
  }   
  else {
    connection.query('update tb_cliente_imovel set pessoa=?, interesse=?,'+
    ' origem=?, responsavel=? where codigo=?', [data.pessoa, data.interesse,
    data.origem, data.responsavel, data.codigo], function(err, rows) {
      if (!err)
        res.json({codigo: data.codigo})
      else
        console.log('Error while performing Query.')
    })
  }     
  connection.end()
}

function codigo(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query('SELECT c.*, p.nome as pessoa_ from tb_cliente_imovel c'+
  ' left join tb_pessoa p on p.codigo=c.pessoa where c.codigo='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })
  connection.end()
}

function pessoa(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query('SELECT codigo from tb_cliente_imovel where pessoa='+cod, function(err, rows, fields) {
    if (!err)
      if (rows.length==0){res.json({codigo: 0})} else{res.json({codigo: rows[0].codigo})}
    else
      console.log('Error while performing Query.')
  });
  connection.end()
}

function localizar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  var sql = '', par = []

  sql += "SELECT p.codigo, p.nome, case when p.tipo=1 then 'Fis' else 'Jur' end as tipo,"
  sql += " case when p.tipo=1 then f.cpf else j.cnpj end as cpf_cnpj"
  sql += " FROM tb_cliente_imovel p left join tb_cliente_imovel_fisica f on f.pessoa=p.codigo"
  sql += " left join tb_cliente_imovel_juridica j on j.pessoa=p.codigo Where"

  if (data.nome!=undefined){
    sql += " nome like '%"+data.nome+"%'"
  }

  connection.connect()
  connection.query(sql, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  })

  connection.end()
}

function dlg_localizar(req, res) {
  res.render('cliente_imovel_dlg_localizar')
}

function dlg_apagar(req, res) {
  res.render('cliente_imovel_dlg_apagar')
}

module.exports = router