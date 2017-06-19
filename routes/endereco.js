var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.Enderecos = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('select codigo,nome from tbendereco order by nome', function(err, rows) {
        if (!err) 
            res.json({AllRecords: rows})
        else
            console.log('Error while performing Query.')
    })
}

exports.EnderecosCidade = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    connection.query('Select en.codigo, en.nome from tbcep as ce'+
    ' inner join tbendereco as en on ce.endereco=en.codigo'+
    ' where ce.uf=? And ce.cidade=? group by en.codigo, en.Nome'+
    ' order by en.Nome;', [data.uf, data.ci], function(err, rows) {
        if (!err) 
            res.json({RecordsOfCity: rows})
        else
            console.log('Error while performing Query.')
    })
}

exports.EnderecosInicioNome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo,nome from tbendereco Where nome like '"+
    txt+"%' order by Nome LIMIT 20;", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}

exports.EnderecosCidadeInicioNome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;
    var est = req.query.est;
    var cid = req.query.cid;

    connection.connect();
    connection.query('Select en.codigo, en.nome from tbcep as ce'+
    ' inner join tbendereco as en on ce.endereco=en.codigo'+
    " where ce.uf=? And ce.cidade=? and en.nome like '"+txt+"%'"+
    ' group by en.codigo, en.Nome order by en.Nome LIMIT 20;', 
    [est, cid], function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}