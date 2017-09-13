var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.NacionalidadeTodas = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tb_nacionalidade order by pais', function(err, rows, fields) {
        if (!err)
            res.json({NacionalidadeTodas: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.NacionalidadePais = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, pais from tb_nacionalidade"+
    " where pais like '"+txt+"%' order by pais LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}