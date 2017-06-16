var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.AllRecords = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tbuf', function(err, rows, fields) {
        if (!err)
            res.json({AllRecords: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.search_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, sigla, nome from tbuf"+
    " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}