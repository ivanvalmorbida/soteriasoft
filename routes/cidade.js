var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.cidade_todas = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('select codigo,nome from tb_cidade order by nome', function(err, rows) {
        if (!err)
            res.json({cidade_todas: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.cidade_estado = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    connection.query('select ci.codigo, ci.nome from tbcep as ce'+
    ' inner join tb_cidade as ci on ce.cidade=ci.codigo'+
    ' where ce.uf=? group by ci.codigo, ci.Nome'+
    ' order by ci.Nome;', [data.uf], function(err, rows) {
        if (!err)
            res.json({RecordsOfState: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.cidade_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo,nome from tb_cidade where nome like '"+
    txt+"%' order by nome LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}

exports.cidade_estado_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;
    var est = req.query.est;

    connection.connect();
    connection.query('select ci.codigo, ci.nome from tb_cep as ce'+
    ' inner join tb_cidade as ci on ce.cidade=ci.codigo'+
    " where ce.estado=? and ci.nome like '"+txt+"%'"+
    " group by ci.codigo, ci.Nome order by ci.nome LIMIT 20", 
    [est], function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}