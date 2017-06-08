var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('teste');
};

exports.RecordsOfCityInitial = function (req, res) {
    var txt = req.query.txt;
    var connection = mysql.createConnection(settings.dbConect);
    connection.connect();
    connection.query("select codigo, nome from tbcidade "+
    " where Nome like '"+txt+"%' LIMIT 30", function(err, rows) {
        if (!err)
            return res.json(rows);
        else
            console.log('Error while performing Query.');
    });   
};