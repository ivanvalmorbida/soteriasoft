var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    connection.query('delete from tb_pessoa_fone where pessoa=?', 
    [data.pessoa], function(err, rows) {
        if (!err)
            for (i = 0; i < data.fones.length; i++) {
                connection.query('insert into tb_pessoa_fone (pessoa, fone) values (?, ?)',
                [data.pessoa, data.fones[i]], function(err, rows) {
                    if (err)
                        console.log('Error while performing Query.')
                });                
            }    
        else
            console.log('Error while performing Query: '+err)
    })
}

exports.pessoa = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.body.cod;
    
    connection.connect();
    connection.query('SELECT * from tb_pessoa_fone where pessoa='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}