var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    if (data.codigo==0) {
        connection.query('insert into tb_imovel_financeiro (imovel, valor, mcmv, financia,'+
        ' entrada, permuta, carro, fgts, condominio, captador) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.imovel, data.valor, data.mcmv, data.financia, data.entrada, data.permuta, 
        data.carro, data.fgts, data.condominio, data.condominio, data.captador], 
        function(err, rows) {
            if (!err)
                res.json({codigo: rows.insertId})            
            else
                console.log('Error while performing Query: '+err)
        });
    }   
    else {
        connection.query('update tb_imovel_financeiro set imovel=?, valor=?, mcmv=?, financia=?,'+
        ' entrada=?, permuta=?, carro=?, fgts=?, condominio=?, captador=? where codigo=?',
        [data.imovel, data.valor, data.mcmv, data.financia, data.entrada, data.permuta, 
        data.carro, data.fgts, data.condominio, data.condominio, data.captador, data.codigo],
        function(err, rows) {
            if (!err)
                res.json({codigo: data.codigo})
            else
                console.log('Error while performing Query.')
        })
    }         
}

exports.imovel = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var cod = req.body.cod;

    connection.connect();
    connection.query('SELECT i.*, p.nome as proprietario_ from tb_imovel_financeiro i'+
    ' left join tb_pessoa p on p.codigo=i.captador'+
    ' where i.codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}