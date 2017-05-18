var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.RecordsOfCep = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();

    connection.query('Select * from tbcep where cep=?;', [data.cep], function(err, rows) {
        if (!err) {
            res.json({RecordsOfCep: rows})
        }
        else
            console.log('Error while performing Query.')
    })
}

exports.RecordsOfCriteria = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var strSQL = '';
    var params = [];

    if (data.uf!='0' && typeof data.uf!='undefined') {
        strSQL += ' And uf=?';
        params.push(data.uf);
    }

    if (data.ci!='0' && typeof data.ci!='undefined') {
        strSQL += ' And cidade=?';
        params.push(data.ci);
    }

    if (data.ba!='0' && typeof data.ba!='undefined') {
        strSQL += ' And bairro=?';
        params.push(data.ba);
    }

    if (data.en!='0' && typeof data.en!='undefined') {
        strSQL += ' And endereco=?';
        params.push(data.en);
    }

    if (strSQL.length>0) {
        strSQL=strSQL.substring(5, strSQL.length);
    };
    strSQL = 'Select * from tbcep where ' + strSQL;

    connection.connect();

    connection.query(strSQL, params, function(err, rows) {
        if (!err) {
            res.json({RecordsOfCriteria: rows})
        }
        else
            console.log('Error while performing Query.')
    })
}
