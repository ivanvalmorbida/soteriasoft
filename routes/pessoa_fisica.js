var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.pessoa_fisica_uma = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.query.cod;

    connection.connect();
    connection.query('SELECT * from tb_pessoa_fisica where pessoa='+cod, function(err, rows, fields) {
        if (!err)
            res.json({pessoa_fisica_uma: rows})
        else
            console.log('Error while performing Query.')
    });
}
