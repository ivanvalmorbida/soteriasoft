var auth = require('../authetication');
var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    auth.active_user(req, res, render_index)
}

function render_index(req, res) {
    res.render('ceps');
};

exports.apagar = function (req, res) {
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
    connection.end();
}

exports.gravar = function (req, res) {
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
    connection.end();
}

exports.cep = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    
    data.cep = data.cep.replace("-", "");

    connection.connect();

    connection.query('SELECT c.*, (select nome from tb_estado where codigo=c.estado) as estado_,'+
    ' (select nome from tb_cidade where codigo=c.cidade) as cidade_,'+
    ' (select nome from tb_bairro where codigo=c.bairro) as bairro_,'+
    ' (select nome from tb_endereco where codigo=c.endereco) as endereco_'+
    ' from tb_cep as c where c.cep=?;', [data.cep], 
    function(err, rows) {
        if (!err)
            res.json({dados: rows})            
        else
            console.log('Error while performing Query.')
    })
    connection.end();
}

exports.endereco = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;                 

    connection.connect();

    connection.query('SELECT c.*, (select nome from tb_estado where codigo=c.estado) as estado_,'+
    ' (select nome from tb_cidade where codigo=c.cidade) as cidade_,'+
    ' (select nome from tb_bairro where codigo=c.bairro) as bairro_,'+
    ' (select nome from tb_endereco where codigo=c.endereco) as endereco_'+
    ' FROM tb_cep c where c.estado=? and c.cidade=? and c.endereco=?',
        [data.estado, data.cidade, data.endereco], 
    function(err, rows) {
        if (!err)
            res.json({dados: rows})            
        else
            console.log(err)
    })
    connection.end();
}

exports.dlg_localizar = function (req, res) {
    res.render('cep_dlg_localizar');
};

exports.dlg_apagar = function (req, res) {
    res.render('cep_dlg_apagar');
};