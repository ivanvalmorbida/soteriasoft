var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, 'foto_imovel_' + datetimestamp 
        + '.' + file.originalname.split('.')
        [file.originalname.split('.').length -1]);
    }
});
var upload = multer({ storage: storage }).single('file');

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

    connection.connect();
    if (data.codigo==0) {


        connection.query('insert into tb_imovel (tipo, proprietario, documentacao, inscricao_incra,'+
        'lote_unidade, quadra_bloco, cadastro) values (?, ?, ?, ?, ?, ?, now());', 
        [data.tipo, data.proprietario, data.documentacao, data.inscricao_incra, 
        data.lote_unidade, data.quadra_bloco], function(err, rows) {
            if (!err)
                res.json({codigo: rows.insertId})            
            else
                console.log('Error while performing Query: '+err)
        });
    }   
    else {
        connection.query('update tb_imovel set tipo=?, proprietario=?, documentacao=?,'+
        'inscricao_incra=?, lote_unidade=?, quadra_bloco=? where codigo=?',
        [data.tipo, data.proprietario, data.documentacao, data.inscricao_incra, 
        data.lote_unidade, data.quadra_bloco, data.codigo], function(err, rows) {
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
    connection.query('SELECT i.*, p.nome as proprietario_ from tb_imovel i'+
    ' left join tb_pessoa p on p.codigo=i.proprietario'+
    ' where i.codigo='+cod, function(err, rows, fields) {
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

    sql += "SELECT i.codigo, p.nome as proprietario, i.inscricao_incra,"
    sql += " t.descricao as tipo, i.lote_unidade, i.quadra_bloco"; 
    sql += " FROM tb_imovel as i left join tb_pessoa p on i.proprietario=p.codigo";
    sql += " left join tb_imovel_tipo t on i.tipo=t.codigo Where";

    if (data.camp=="prop"){
        sql += " p.nome like '%"+data.text+"%'"
    }
    if (data.camp=="insc"){
        sql += " i.inscricao_incra like '%"+data.text+"%'"
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

exports.add_imagem =  function(req, res, next) {
    upload(req, res, function(err){
      if(!err){
        console.log(req.file);
        console.log(req.file.filename);
        console.log(req.body.imovel);
      }
    });
}