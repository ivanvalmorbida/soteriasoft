var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
    var connection = mysql.createConnection(settings.dbConect);
    var data = req.body;

    connection.connect();
    if (data.codigo==0) {
        connection.query('insert into tb_imovel_terreno (imovel, cep, estado, cidade, bairro,'+
        ' endereco, numero, complemento, area_terreno, frente, fundo, lateral1, lateral2,'+
        ' gabarito, esquina) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.imovel, data.cep, data.estado, data.cidade, data.bairro, data.endereco, 
        data.numero, data.complemento, data.area_terreno, data.frente, data.fundo, data.lateral1,
        data.lateral2, data.gabarito, data.esquina], function(err, rows) {
            if (!err)
                res.json({codigo: rows.insertId})            
            else
                console.log('Error while performing Query: '+err)
        });
    }   
    else {
        connection.query('update tb_imovel_terreno set imovel=?, cep=?, estado=?, cidade=?, bairro=?,'+
        ' endereco=?, numero=?, complemento=?, area_terreno=?, frente=?, fundo=?, lateral1=?, lateral2=?,'+
        ' gabarito=?, esquina=? where codigo=?',
        [data.imovel, data.cep, data.estado, data.cidade, data.bairro, data.endereco, 
        data.numero, data.complemento, data.area_terreno, data.frente, data.fundo, data.lateral1,
        data.lateral2, data.gabarito, data.esquina, data.codigo], function(err, rows) {
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
    connection.query("SELECT i.*, u.nome as estado_, m.nome as cidade_,"+
    ' b.nome as bairro_, e.nome as endereco_ from tb_imovel_terreno i'+
    ' left join tb_estado u on u.codigo=i.estado'+
    ' left join tb_cidade m on m.codigo=i.cidade'+
    ' left join tb_bairro b on b.codigo=i.bairro'+
    ' left join tb_endereco e on e.codigo=i.endereco'+
    ' where i.codigo='+cod, function(err, rows, fields) {
        if (!err)
            res.json({dados: rows})
        else
            console.log('Error while performing Query.')
    });
}