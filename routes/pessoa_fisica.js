var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    connection.query('select pessoa from tb_pessoa_fisica where pessoa=?', [data.pessoa], 
    function(err, rows) {
        if (!err) {
            if (rows.length == 0) {
                connection.query('insert into tb_pessoa_fisica (pessoa, nascimento, cidadenasc,'+
                'ufnasc, nacionalidade, sexo, cpf, identidade, orgaoidentidade, identidadeuf,'+
                'estadocivil, conjuge, profissao, ctps, pis)'+
                ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.pessoa, data.nascimento,
                data.cidadenasc, data.ufnasc, data.nacionalidade, data.sexo, data.cpf, data.identidade, 
                data.orgaoidentidade, data.identidadeuf, data.estadocivil, data.conjuge, data.profissao,
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
                ' identidadeuf=?, estadocivil=?, conjuge=?, profissao=?, ctps=?, pis=? where pessoa=?', 
                [data.nascimento, data.cidadenasc, data.ufnasc, data.nacionalidade, data.sexo, 
                data.cpf, data.identidade, data.orgaoidentidade, data.identidadeuf, data.estadocivil,
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
    connection.query('SELECT * from tb_pessoa_fisica where pessoa='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}
