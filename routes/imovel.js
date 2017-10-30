var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('imovel');
};

exports.dlg_apagar = function (req, res) {
    res.render('imovel_dlg_apagar');
};

exports.dlg_localizar = function (req, res) {
    res.render('imovel_dlg_localizar');
};

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    data.cep = data.cep.replace("-", "");

    connection.connect();
    if (data.codigo==0) {
        connection.query('insert into tb_imovel (tipo, nome, cep, estado, cidade,'+
        ' bairro, endereco, numero, complemento, obs, cadastro)'+
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());', 
        [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
        data.endereco, data.numero, data.complemento, data.obs], function(err, rows) {
            if (!err)
                res.json({codigo: rows.insertId})            
            else
                console.log('Error while performing Query: '+err)
        })
    }   
    else {
        connection.query('update tb_imovel set tipo=?, nome=?, cep=?, estado=?, cidade=?,'+
        'bairro=?, endereco=?, numero=?, complemento=?, obs=? where codigo=?',
        [data.tipo, data.nome, data.cep, data.estado, data.cidade, data.bairro, 
        data.endereco, data.numero, data.complemento, data.obs, data.codigo], function(err, rows) {
            if (!err)
                res.json({codigo: data.codigo})
            else
                console.log('Error while performing Query.')
        })
    }         
}

exports.codigo = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.body.cod;

    connection.connect();
    connection.query("SELECT p.*, u.nome as estado_, m.nome as cidade_,"+
    ' b.nome as bairro_, e.nome as endereco_ from tb_imovel p'+
    ' left join tb_estado u on u.codigo=p.estado'+
    ' left join tb_cidade m on m.codigo=p.cidade'+
    ' left join tb_bairro b on b.codigo=p.bairro'+
    ' left join tb_endereco e on e.codigo=p.endereco'+
    ' where p.codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}

exports.localizar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var sql = '', par = [];

    sql += "SELECT p.nome, case when p.tipo=1 then 'Fis' else 'Jur' end as tipo,";
    sql += " case when p.tipo=1 then f.cpf else j.cnpj end as cpf_cnpj"; 
    sql += " FROM tb_imovel p left join tb_imovel_fisica f on f.imovel=p.codigo";
    sql += " left join tb_imovel_juridica j on j.imovel=p.codigo Where";

    if (data.nome!=undefined){
        sql += " nome like '%"+data.nome+"%'"
    }

    connection.connect();
    connection.query(sql, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}