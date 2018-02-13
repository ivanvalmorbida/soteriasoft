var settings = require("../settings");
var mysql   = require('mysql');

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('select imovel from tb_imovel_financeiro where imovel=?', [data.imovel], 
  function(err, rows) {
    if (!err) {
      if (rows.length == 0) {
        connection.query('insert into tb_imovel_financeiro (imovel, valor, mcmv, financia,'+
        ' entrada, permuta, carro, fgts, condominio, captador) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.imovel, data.valor, data.mcmv, data.financia, data.entrada, data.permuta, 
        data.carro, data.fgts, data.condominio, data.condominio, data.captador], 
        function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error while performing Query: '+err)

          connection.end();
        });
      }   
      else {
        connection.query('update tb_imovel_financeiro set valor=?, mcmv=?, financia=?,'+
        ' entrada=?, permuta=?, carro=?, fgts=?, condominio=?, captador=? where imovel=?',
        [data.valor, data.mcmv, data.financia, data.entrada, data.permuta, 
        data.carro, data.fgts, data.condominio, data.captador, data.imovel],
        function(err, rows) {
          if (!err)
            res.json({dados: rows})
          else
            console.log('Error while performing Query.')
          
          connection.end();
        })
      }     
    }
    else
      console.log('Error while performing Query.')
  })          
}

exports.imovel = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var cod = req.body.cod;

  connection.connect();
  connection.query('SELECT i.*, p.nome as captador_ from tb_imovel_financeiro i'+
  ' left join tb_pessoa p on p.codigo=i.captador'+
  ' where i.imovel='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}