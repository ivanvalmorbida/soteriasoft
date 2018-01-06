var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('usuario');
};

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    if (data.codigo==0) {
        connection.query('insert into tb_usuario (tipo, usuario, senha, '+ 
        'pessoa, cadastro) values (?, ?, ?, ?, now());', 
        [data.tipo, data.usuario, data.senha, data.pessoa],
        function(err, rows) {
            if (!err)
                res.json({codigo: rows.insertId})            
            else
                console.log('Error while performing Query: '+err)
        })
    }   
    else {
        connection.query('update tb_usuario set tipo=?, usuario=?, senha=?, '+
        'pessoa=? where codigo=?',[data.tipo, data.usuario, data.senha, data.pessoa],
        function(err, rows) {
            if (!err)
                res.json({codigo: data.codigo})
            else
                console.log('Error while performing Query.')
        })
    }         
    connection.end();
}

exports.codigo = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.body.cod;

    connection.connect();
    connection.query('SELECT u.*, p.nome as pessoa_ from tb_usuario u'+
    ' left join tb_pessoa p on u.pessoa=p.codigo'+
    ' where u.codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
    connection.end();
}

exports.localizar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var sql = '', par = [];

    sql += "SELECT p.codigo, p.nome, case when p.tipo=1 then 'Fis' else 'Jur' end as tipo,";
    sql += " case when p.tipo=1 then f.cpf else j.cnpj end as cpf_cnpj"; 
    sql += " FROM tb_usuario p left join tb_usuario_fisica f on f.usuario=p.codigo";
    sql += " left join tb_usuario_juridica j on j.usuario=p.codigo Where";

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

    connection.end();
}

exports.dlg_localizar = function (req, res) {
    res.render('usuario_dlg_localizar');
};

exports.dlg_apagar = function (req, res) {
    res.render('usuario_dlg_apagar');
};