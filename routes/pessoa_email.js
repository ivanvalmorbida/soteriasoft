var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.PessoaEmailTodos = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.query.cod;

    connection.connect();
    connection.query('SELECT * from tb_pessoa_email where pessoa='+cod, function(err, rows, fields) {
        if (!err)
            res.json({PessoaEmailTodos: rows})
        else
            console.log('Error while performing Query.')
    });
}
