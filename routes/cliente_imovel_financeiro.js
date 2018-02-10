var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var auth = require('../authetication');

// renda ???

exports.index = function (req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('cliente_imovel_financeiro', {empresa: settings.empresa});
};

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  data.cep = data.cep.replace("-", "");

  connection.connect();
  if (data.codigo==0) {
    connection.query('insert into tb_cliente_imovel_financeiro (tipo, nome, cep, estado, cidade,'+
    ' bairro, endereco, numero, complemento, obs, cadastro)'+
    ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());', 
    [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
    data.endereco, data.numero, data.complemento, data.obs], function(err, rows) {
      if (!err)
        res.json({codigo: rows.insertId})      
      else
        console.log('Error while performing Query: '+err)
    })
  }   
  else {
    connection.query('update tb_cliente_imovel_financeiro set tipo=?, nome=?, cep=?, estado=?, cidade=?,'+
    'bairro=?, endereco=?, numero=?, complemento=?, obs=? where codigo=?',
    [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
    data.endereco, data.numero, data.complemento, data.obs, data.codigo], function(err, rows) {
      if (!err)
        res.json({codigo: data.codigo})
      else
        console.log('Error while performing Query.')
    })
  }     
  connection.end();
}

exports.codigo = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query("SELECT p.*, u.nome as estado_, m.nome as cidade_,"+
  ' b.nome as bairro_, e.nome as endereco_ from tb_cliente_imovel_financeiro p'+
  ' left join tb_estado u on u.codigo=p.estado'+
  ' left join tb_cidade m on m.codigo=p.cidade'+
  ' left join tb_bairro b on b.codigo=p.bairro'+
  ' left join tb_endereco e on e.codigo=p.endereco'+
  ' where p.codigo='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}

exports.cliente_imovel_financeiro_todas = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);

  connection.connect();
  connection.query('SELECT * from tb_cliente_imovel_financeiro order by nome', function(err, rows, fields) {
    if (!err)
      res.json({cliente_imovel_financeiro_todas: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}

exports.cliente_imovel_financeiro_nome = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var txt = req.query.txt;

  connection.connect();
  connection.query("select codigo, nome from tb_cliente_imovel_financeiro"+
  " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}

exports.localizar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;
  var sql = '', par = [];

  sql += "SELECT p.codigo, p.nome, case when p.tipo=1 then 'Fis' else 'Jur' end as tipo,";
  sql += " case when p.tipo=1 then f.cpf else j.cnpj end as cpf_cnpj"; 
  sql += " FROM tb_cliente_imovel_financeiro p left join tb_cliente_imovel_financeiro_fisica f on f.pessoa=p.codigo";
  sql += " left join tb_cliente_imovel_financeiro_juridica j on j.pessoa=p.codigo Where";

  if (data.nome!=undefined){
    sql += " nome like '%"+data.nome+"%'"
  }

  connection.connect();
  connection.query(sql, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });

  connection.end();
}

exports.dlg_localizar = function (req, res) {
  res.render('cliente_imovel_financeiro_dlg_localizar');
};

exports.dlg_apagar = function (req, res) {
  res.render('cliente_imovel_financeiro_dlg_apagar');
};