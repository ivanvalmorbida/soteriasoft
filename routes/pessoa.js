var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.PessoaUma = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.query.cod;

    connection.connect();
    connection.query('SELECT * from tb_pessoa where codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({PessoaUma: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.PessoaTodas = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tb_pessoa order by nome', function(err, rows, fields) {
        if (!err)
            res.json({PessoaTodas: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.PessoaNome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, nome from tb_pessoa"+
    " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}