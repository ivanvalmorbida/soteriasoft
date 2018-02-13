var settings = require("../settings");
var mysql   = require('mysql');
var dateFormat = require('dateformat');

exports.gravar = function (req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var data = req.body;

  connection.connect();
  connection.query('select imovel from tb_imovel_construcao where imovel=?', [data.imovel], 
  function(err, rows) {
    if (!err) {
      data.entrega = dateFormat(data.entrega, "yyyy-mm-dd hh:MM:ss");
      if (rows.length == 0) {
        connection.query('insert into tb_imovel_construcao (imovel, entrega, ano_construcao,'+
        ' area_total, area_privativa, quartos, suites, garagens, mobiliada, churrasqueira,'+
        ' infra_ar_cond, piso, teto, reboco, murro, portao, quintal_larg, quintal_comp, andar'+
        ') values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.imovel, data.entrega, data.ano_construcao, data.area_total, data.area_privativa, 
        data.quartos, data.suites, data.garagens, data.mobiliada, data.churrasqueira, 
        data.infra_ar_cond, data.piso, data.teto, data.reboco, data.murro, data.portao, 
        data.quintal_larg, data.quintal_comp, data.andar], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error while performing Query: '+err)
            
          connection.end();
        });
      }   
      else {
        connection.query('update tb_imovel_construcao set entrega=?, ano_construcao=?,'+
        ' area_total=?, area_privativa=?, quartos=?, suites=?, garagens=?, mobiliada=?,'+
        ' churrasqueira=?, infra_ar_cond=?, piso=?, teto=?, reboco=?, murro=?, portao=?,'+
        ' quintal_larg=?, quintal_comp=?, andar=? where imovel=?', [data.entrega, 
        data.ano_construcao, data.area_total, data.area_privativa, data.quartos, data.suites, 
        data.garagens, data.mobiliada, data.churrasqueira, data.infra_ar_cond, data.piso, 
        data.teto, data.reboco, data.murro, data.portao, data.quintal_larg, data.quintal_comp,
        data.andar, data.imovel], function(err, rows) {
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
  connection.query('SELECT i.* from tb_imovel_construcao i'+
  ' where i.imovel='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error while performing Query.')
  });
  connection.end();
}