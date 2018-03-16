var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var dateFormat = require('dateformat');

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('select pessoa from tb_pessoa_fisica where pessoa=?', [data.pessoa], 
  function(err, rows) {
    if (!err) {
      data.nascimento = dateFormat(data.nascimento, "yyyy-mm-dd h:MM:ss");
      if (rows.length == 0) {        
        connection.query('insert into tb_pessoa_fisica (pessoa, nascimento, cidadenasc,'+
        'ufnasc, nacionalidade, sexo, cpf, identidade, orgaoidentidade, ufidentidade,'+
        'estadocivil, conjuge, profissao, ctps, pis)'+
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.pessoa, data.nascimento,
        data.cidadenasc, data.ufnasc, data.nacionalidade, data.sexo, data.cpf, data.identidade, 
        data.orgaoidentidade, data.ufidentidade, data.estadocivil, data.conjuge, data.profissao,
        data.ctps, data.pis], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error while performing Query.')
        })
      }   
      else {
        connection.query('update tb_pessoa_fisica set nascimento=?, cidadenasc=?,'+
        ' ufnasc=?, nacionalidade=?, sexo=?, cpf=?, identidade=?, orgaoidentidade=?,'+
        ' ufidentidade=?, estadocivil=?, conjuge=?, profissao=?, ctps=?, pis=? where pessoa=?', 
        [data.nascimento, data.cidadenasc, data.ufnasc, data.nacionalidade, data.sexo, 
        data.cpf, data.identidade, data.orgaoidentidade, data.ufidentidade, data.estadocivil,
        data.conjuge, data.profissao, data.ctps, data.pis, data.pessoa], function(err, rows) {
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

exports.pessoa = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query('SELECT p.*, un.nome as ufnasc_, mn.Nome as cidadenasc_,'+
  ' n.pais as nacionalidade_, ui.nome as ufidentidade_,e.Descricao as estadocivil_,'+
  ' c.nome as conjuge_, pr.Descricao as profissao_ FROM tb_pessoa_fisica p'+
  ' left join tb_estado un on un.codigo=p.ufnasc'+
  ' left join tb_cidade mn on mn.codigo=p.cidadenasc'+
  ' left join tb_nacionalidade n on n.codigo=p.nacionalidade'+
  ' left join tb_estado ui on ui.codigo=p.ufidentidade'+
  ' left join tb_estado_civil e on e.codigo=p.estadocivil'+
  ' left join tb_pessoa c on c.codigo=p.conjuge'+
  ' left join tb_cbo pr on pr.cbo=p.profissao where p.pessoa='+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}
