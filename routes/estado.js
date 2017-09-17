var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.estado_todos = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tb_estado', function(err, rows, fields) {
        if (!err)
            res.json({estado_todos: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.estado_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, sigla, nome from tb_estado"+
    " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}

exports.estado_sigla = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, sigla from tb_estado"+
    " where sigla like '"+txt+"%' order by sigla", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}