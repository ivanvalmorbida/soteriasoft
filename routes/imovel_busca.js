var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var auth = require('../authetication');

exports.index = function (req, res) {
    auth.active_user(req, res, render_index)
}

function render_index(req, res) {
    res.render('imovel_busca');
};


exports.palavra_chave = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var sql = '', sqlw = '', par = [];
    
    /*
select concat(
ifNull(t.descricao, ''), ' ', ifNull(p.nome, ''), ' ', 
ifNull(i.inscricao_incra, ''), ' ', ifNull(l.cep, ''), ' ', 
ifNull(u.nome, ''), ' ', ifNull(m.nome, ''), ' ', 
ifNull(b.nome, ''), ' ', ifNull(e.nome, ''), ' ', 
ifNull(u.Sigla, ''), if(f.mcmv=1, ' mcmv', ''), 
if(f.financia=1, ' financiavel', ''), ' ', 
cast(cast(f.valor as unsigned) as char)
) as x

from tb_imovel as i 
left join tb_pessoa p on i.proprietario=p.codigo 
left join tb_imovel_tipo t on i.tipo=t.codigo 
left join tb_imovel_terreno l on l.imovel=i.codigo 
left join tb_imovel_financeiro f on f.imovel=i.codigo
left join tb_estado u on u.codigo=l.estado
left join tb_cidade m on m.codigo=l.cidade
left join tb_bairro b on b.codigo=l.bairro
left join tb_endereco e on e.codigo=l.endereco
where i.codigo=1000
    */

}

exports.localizar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;
    var sql = '', sqlw = '', par = [];

    sql += "SELECT i.codigo, p.nome as proprietario, i.inscricao_incra,"
    sql += " t.descricao as tipo, i.lote_unidade, i.quadra_bloco"; 
    sql += " FROM tb_imovel as i";
    sql += " left join tb_pessoa p on i.proprietario=p.codigo";
    sql += " left join tb_imovel_tipo t on i.tipo=t.codigo";
    sql += " left join tb_imovel_terreno l on l.imovel=i.codigo";
    sql += " left join tb_imovel_financeiro f on f.imovel=t.codigo";

    if (data.tipo!=0){
        sqlw += " and i.tipo=?"
        par.push(data.tipo);
    }

    if (data.valor!=0){
        sqlw += " and f.valor=?"
        par.push(data.valor);
    }

    if (data.mcmv!=0){
        sqlw += " and f.mcmv=?"
        par.push(data.mcmv);
    }

    if (data.financia!=0){
        sqlw += " and f.financia=?"
        par.push(data.financia);
    }

    if (data.pessoa!=undefined){
        sqlw += " and i.proprietario=?"
        par.push(data.i.pessoa);
    }

    if (data.estado!=undefined){
        sqlw += " and l.estado=?"
        par.push(data.i.estado);
    }

    if (data.cidade!=undefined){
        sqlw += " and l.cidade=?"
        par.push(data.i.cidade);
    }

    if (data.bairro!=undefined){
        sqlw += " and l.bairro=?"
        par.push(data.i.bairro);
    }

    if (data.endereco!=undefined){
        sqlw += " and l.endereco=?"
        par.push(data.i.endereco);
    }

    if (sqlw.length>0) {
        sqlw=sqlw.substring(5, sqlw.length);
        sql=sql+' Where '+sqlw;
    };

    connection.query(sql, par, function(err, rows) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
    connection.end();
}