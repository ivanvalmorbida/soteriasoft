var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('ceps');
};

exports.cep_gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    data.cep = data.cep.replace("-", "");

    connection.connect();

    connection.query('insert into tb_cep (cep, estado, cidade, bairro, endereco, complemento)'+
        ' values (?, ?, ?, ?, ?, ?)', 
        [data.cep, data.estado, data.cidade, data.bairro, data.endereco, data.complemeto], 
    function(err, rows) {
        if (!err) {
            res.json({dados: rows})            
        }
        else
            console.log('Error while performing Query.')
    })
}

exports.cep_cep = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var cep = data.cep;

    cep = cep.replace("-", "");

    connection.connect();

    connection.query('SELECT c.*, u.nome as estado_, m.nome as cidade_,'+
        ' b.nome as bairro_, e.nome as endereco_'+
        ' FROM tb_cep c inner join tb_uf u on u.codigo=c.estado'+
        ' inner join tb_cidade m on m.codigo=c.cidade'+
        ' inner join tb_bairro b on b.codigo=c.bairro'+
        ' inner join tb_endereco e on e.codigo=c.endereco where c.cep=?;', [cep], 
    function(err, rows) {
        if (!err) {
            res.json({dados: []})            
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

    if (data.estado!='0' && typeof data.estado!='undefined') {
        strSQL += ' And estado=?';
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
