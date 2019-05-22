var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')
var auth = require('../authetication')

router.get('/imovel_busca', index)
router.post('/imovel_busca/localizar', localizar)
router.post('/imovel_busca/palavra_chave', palavra_chave)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('imovel_busca', {empresa: settings.empresa})
}

function palavra_chave(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  var sql = '', sqlw = '', par = []
  
  sql += "CALL sp_palavra_chave(?);"

  connection.query(sql, [data.imo], function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

 function localizar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  var sql = '', sqlw = '', par = []

  sql += "SELECT i.codigo, p.nome as proprietario, i.inscricao_incra,"
  sql += " t.descricao as tipo, i.lote_unidade, i.quadra_bloco"
  sql += " FROM tb_imovel as i"
  sql += " left join tb_pessoa p on i.proprietario=p.codigo"
  sql += " left join tb_imovel_tipo t on i.tipo=t.codigo"
  sql += " left join tb_imovel_terreno l on l.imovel=i.codigo"
  sql += " left join tb_imovel_financeiro f on f.imovel=i.codigo"

  if (data.texto!=''){
    sqlw += " and i.codigo in(select imovel from tb_imovel_busca where palavra_chave like '%"+data.texto+"%')"
  }
  else{
    if (data.tipo!=0){
      sqlw += " and i.tipo=?"
      par.push(data.tipo)
    }

    if (data.valor!=0){
      sqlw += " and f.valor=?"
      par.push(data.valor)
    }

    if (data.mcmv!=0){
      sqlw += " and f.mcmv=?"
      par.push(data.mcmv)
    }

    if (data.financia!=0){
      sqlw += " and f.financia=?"
      par.push(data.financia)
    }

    if (data.pessoa!=0){
      sqlw += " and i.proprietario=?"
      par.push(data.pessoa)
    }

    if (data.estado!=0){
      sqlw += " and l.estado=?"
      par.push(data.estado)
    }

    if (data.cidade!=0){
      sqlw += " and l.cidade=?"
      par.push(data.cidade)
    }

    if (data.bairro!=0){
      sqlw += " and l.bairro=?"
      par.push(data.bairro)
    }

    if (data.endereco!=0){
      sqlw += " and l.endereco=?"
      par.push(data.endereco)
    }
  }

  if (sqlw.length>0) {
    sqlw=sqlw.substring(5, sqlw.length)
    sql=sql+' Where '+sqlw
  };

  connection.query(sql, par, function(err, rows) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  });
  connection.end()
}

module.exports = router