var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('ceps');
};

exports.cep_apagar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    data.cep = data.cep.replace("-", "");

    connection.connect();
    connection.query('delete from tb_cep where cep=?', [data.cep], 
    function(err, rows) {
        if (!err) {
            res.json({dados: rows})  
        }
        else
            console.log('Error while performing Query.')
    })
}

exports.cep_gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    data.cep = data.cep.replace("-", "");

    connection.connect();
    connection.query('select cep from tb_cep where cep=?', [data.cep], 
    function(err, rows) {
        if (!err) {
            if (rows.length == 0) {
                connection.query('insert into tb_cep (cep, estado, cidade, bairro, endereco, complemento)'+
                ' values (?, ?, ?, ?, ?, ?)', [data.cep, data.estado, data.cidade, data.bairro, 
                data.endereco, data.complemento], function(err, rows) {
                    if (!err)
                        res.json({dados: rows})            
                    else
                        console.log('Error while performing Query.')
                })
            }   
            else {
                connection.query('update tb_cep set estado=?, cidade=?, bairro=?, endereco=?,'+
                'complemento=? where cep=?', [data.estado, data.cidade, data.bairro, data.endereco, 
                data.complemento, data.cep], function(err, rows) {
                    if (!err)
                        res.json({dados: rows})            
                    else
                        console.log('Error while performing Query.')
                })
            }         
        }
        else
            console.log('Error while performing Query.')
    })

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
    
    data.cep = data.cep.replace("-", "");

    connection.connect();

    connection.query('SELECT c.*, u.nome as estado_, m.nome as cidade_,'+
        ' b.nome as bairro_, e.nome as endereco_'+
        ' FROM tb_cep c inner join tb_estado u on u.codigo=c.estado'+
        ' inner join tb_cidade m on m.codigo=c.cidade'+
        ' inner join tb_bairro b on b.codigo=c.bairro'+
        ' inner join tb_endereco e on e.codigo=c.endereco where c.cep=?;', [data.cep], 
    function(err, rows) {
        if (!err)
            res.json({dados: rows})            
        else
            console.log('Error while performing Query.')
    })
}

exports.cep_endereco = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    
    connection.connect();

    connection.query('SELECT c.*, u.nome as estado_, m.nome as cidade_,'+
        ' b.nome as bairro_, e.nome as endereco_'+
        ' FROM tb_cep c inner join tb_estado u on u.codigo=c.estado'+
        ' inner join tb_cidade m on m.codigo=c.cidade'+
        ' inner join tb_bairro b on b.codigo=c.bairro'+
        ' inner join tb_endereco e on e.codigo=c.endereco'+
        ' where c.estado=? and c.cidade=? and c.endereco=?',
        [data.estado, data.cidade, data.endereco], 
    function(err, rows) {
        if (!err)
            res.json({dados: rows})            
        else
            console.log('Error while performing Query.')
    })
}