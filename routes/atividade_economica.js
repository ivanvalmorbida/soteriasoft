var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.atividade_economica_todas = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tb_atividade_economica order by descricao', function(err, rows, fields) {
        if (!err)
            res.json({atividade_economica_todas: rows})
        else
            console.log('Error while performing Query.')
    });
    connection.end();
}

exports.atividade_economica_descricao = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, atividade, descricao from tb_atividade_economica"+
    " where descricao like '"+txt+"%' order by descricao LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
    connection.end();
}