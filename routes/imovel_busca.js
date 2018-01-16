var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('imovel_busca');
};

exports.localizar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var sql = '', par = [];

    sql += "SELECT i.codigo, p.nome as proprietario, i.inscricao_incra,"
    sql += " t.descricao as tipo, i.lote_unidade, i.quadra_bloco"; 
    sql += " FROM tb_imovel as i left join tb_pessoa p on i.proprietario=p.codigo";
    sql += " left join tb_imovel_terreno l on l.imovel=i.codigo";
    sql += " left join tb_imovel_tipo t on i.tipo=t.codigo Where";

    if (data.tipo!=0){
        sql += " i.tipo="+data.tipo+' and'
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