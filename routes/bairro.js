var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.Bairros = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('select codigo,nome from tbbairro order by nome', function(err, rows) {
        if (!err)
            res.json({AllRecords: rows})
        else
            console.log('Error while performing Query.')
    })
}

exports.BairrosCidade = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    connection.query('Select ba.codigo, ba.nome from tbcep as ce'+
    ' inner join tbbairro as ba on ce.bairro=ba.codigo'+
    ' where ce.uf=? And ce.cidade=? group by ba.codigo, ba.Nome'+
    ' order by ba.Nome;', [data.uf, data.ci], function(err, rows) {
        if (!err)
            res.json({RecordsOfCity: rows})
        else
            console.log('Error while performing Query.')
    })
}

exports.BairrosInicioNome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo,nome from tbbairro Where nome like '"+
    txt+"%' order by Nome LIMIT 20;", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}

exports.BairrosCidadeInicioNome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;
    var est = req.query.est;
    var cid = req.query.cid;

    connection.connect();
    connection.query('Select ba.codigo, ba.nome from tbcep as ce'+
    ' inner join tbbairro as ba on ce.bairro=ba.codigo'+
    " where ce.uf=? And ce.cidade=? and ba.nome like '"+txt+"%'"+
    ' group by ba.codigo, ba.Nome order by ba.Nome LIMIT 20;', 
    [est, cid], function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}