var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.AllRecords = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();

    connection.query('select codigo,nome from tbbairro order by nome', function(err, rows) {
        if (!err) {
            res.json({AllRecords: rows})
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.')
    })
}

exports.RecordsOfCity = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();

    connection.query('Select ba.codigo, ba.nome from tbcep as ce'+
    ' inner join tbbairro as ba on ce.bairro=ba.codigo'+
    ' where ce.uf=? And ce.cidade=? group by ba.codigo, ba.Nome'+
    ' order by ba.Nome;', [data.uf, ata.ci], function(err, rows) {
        if (!err) {
            res.json({RecordsOfCity: rows})
            //console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.')
    })
}
