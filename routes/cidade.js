var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.AllRecords = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();

    connection.query('select codigo,nome from tbcidade order by nome', function(err, rows) {
        if (!err) {
            res.json({AllRecords: rows});
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
}

exports.RecordsOfState = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();

    connection.query('select ci.codigo, ci.nome from tbcep as ce'+
    ' inner join tbcidade as ci on ce.cidade=ci.codigo'+
    ' where ce.uf=? group by ci.codigo, ci.Nome'+
    ' order by ci.Nome;', [data.uf], function(err, rows) {
        if (!err) {
            res.json({RecordsOfState: rows});
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
}

exports.search_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();

    connection.query("select nome as name from tbcidade "+
    " where Nome like '"+data.no+"%' LIMIT 20", function(err, rows) {
        if (!err) {
            res.json({search_nome: rows});
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
}