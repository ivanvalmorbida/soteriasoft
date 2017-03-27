var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.AllRecords = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();

    connection.query('SELECT * from tbuf', function(err, rows, fields) {
        if (!err) {
            res.json({AllRecords: rows});
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
}

