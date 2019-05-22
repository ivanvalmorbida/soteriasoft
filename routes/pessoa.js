var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')
var auth = require('../authetication')

router.get('/pessoa', index)
router.get('/pessoa/pessoa_nome', pessoa_nome)
router.get('/pessoa/pessoa_nome_contato', pessoa_nome_contato)
router.get('/pessoa/dlg/apagar', dlg_apagar)
router.get('/pessoa/dlg/localizar', dlg_localizar)
router.post('/pessoa/gravar', gravar)
router.post('/pessoa/codigo', codigo)
router.post('/pessoa/localizar', localizar)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('pessoa', {empresa: settings.empresa})
}

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  data.cep = data.cep.replace("-", "")

  connection.connect()
  if (data.codigo==0) {
    connection.query('insert into tb_pessoa (tipo, nome, cep, estado, cidade,'+
    ' bairro, endereco, numero, complemento, obs, cadastro)'+
    ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());', 
    [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
    data.endereco, data.numero, data.complemento, data.obs], function(err, rows) {
      if (!err)
        res.json({codigo: rows.insertId})      
      else
        console.log('Error mensage: '+err)
    })
  }   
  else {
    connection.query('update tb_pessoa set tipo=?, nome=?, cep=?, estado=?, cidade=?,'+
    'bairro=?, endereco=?, numero=?, complemento=?, obs=? where codigo=?',
    [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
    data.endereco, data.numero, data.complemento, data.obs, data.codigo], function(err, rows) {
      if (!err)
        res.json({codigo: data.codigo})
      else
        console.log('Error mensage: '+err)
    })
  }     
  connection.end()
}

function codigo(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query("SELECT p.*, u.nome as estado_, m.nome as cidade_,"+
  ' b.nome as bairro_, e.nome as endereco_ from tb_pessoa p'+
  ' left join tb_estado u on u.codigo=p.estado'+
  ' left join tb_cidade m on m.codigo=p.cidade'+
  ' left join tb_bairro b on b.codigo=p.bairro'+
  ' left join tb_endereco e on e.codigo=p.endereco'+
  ' where p.codigo='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function pessoa_todas(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_pessoa order by nome', function(err, rows, fields) {
    if (!err)
      res.json({pessoa_todas: rows})
    else
      console.log('Error mensage: '+err)
  });
  connection.end()
}

function pessoa_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo, nome from tb_pessoa"+
  " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function pessoa_nome_contato(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select p.codigo, p.nome, (select email from tb_pessoa_email"+
  " where pessoa=p.codigo limit 1) as email, (select fone from tb_pessoa_fone" +
  " where pessoa=p.codigo limit 1) as fone from tb_pessoa as p"+
  " where p.nome like '"+txt+"%' order by p.nome LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function localizar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  var sql = '', par = []

  sql += "SELECT p.codigo, p.nome, case when p.tipo=1 then 'Fis' else 'Jur' end as tipo,";
  sql += " case when p.tipo=1 then f.cpf else j.cnpj end as cpf_cnpj"; 
  sql += " FROM tb_pessoa p left join tb_pessoa_fisica f on f.pessoa=p.codigo";
  sql += " left join tb_pessoa_juridica j on j.pessoa=p.codigo Where";

  if (data.nome!=undefined){
    sql += " nome like '%"+data.nome+"%'"
  }

  connection.connect();
  connection.query(sql, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  });

  connection.end()
}

function dlg_localizar(req, res) {
  res.render('pessoa_dlg_localizar')
}

function dlg_apagar(req, res) {
  res.render('pessoa_dlg_apagar')
}

module.exports = router