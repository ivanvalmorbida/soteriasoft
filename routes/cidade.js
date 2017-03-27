var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.AllRecords = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();

    connection.query('SELECT * from tbcidade', function(err, rows, fields) {
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

    connection.query('SELECT * from tbcidade where uf=?', [data.uf], function(err, rows, fields) {
        if (!err) {
            res.json({AllRecords: rows});
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
}
