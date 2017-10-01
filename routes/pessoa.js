var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('pessoa');
};

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    data.cep = data.cep.replace("-", "");

    connection.connect();
    if (data.codigo==0) {
        connection.query('insert into tb_pessoa (tipo, nome, cep, estado, cidade,'+
        ' bairro, endereco, numero, complemento, obs, cadastro)'+
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());', 
        [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
        data.endereco, data.numero, data.complemento, data.obs], function(err, rows) {
            if (!err)
                res.json({dados: rows})            
            else
                console.log('Error while performing Query: '+err)
        })
    }   
    else {
        connection.query('update tb_pessoa set tipo=?, nome=?, cep=?, estado=?, cidade=?,'+
        'bairro=?, endereco=?, numero=?, complemento=? obs=? where codigo=?',
        [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
        data.endereco, data.numero, data.complemento, data.obs, data.codigo], function(err, rows) {
            if (!err)
                res.json({dados: rows})            
            else
                console.log('Error while performing Query.')
        })
    }         
}

exports.pessoa_uma = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.query.cod;

    connection.connect();
    connection.query('SELECT * from tb_pessoa where codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({pessoa_uma: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.pessoa_todas = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);

    connection.connect();
    connection.query('SELECT * from tb_pessoa order by nome', function(err, rows, fields) {
        if (!err)
            res.json({pessoa_todas: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.pessoa_nome = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var txt = req.query.txt;

    connection.connect();
    connection.query("select codigo, nome from tb_pessoa"+
    " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
        if (!err)
            return res.json(rows)
        else
            console.log('Error while performing Query.')
    });
}