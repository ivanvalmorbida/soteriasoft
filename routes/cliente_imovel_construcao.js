var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')
var auth = require('../authetication')

router.post('/cliente_imovel_cons/gravar', gravar)
router.post('/cliente_imovel_cons/cliente', cliente)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('select cliente from tb_cliente_imovel_construcao where cliente=?', [data.cliente], 
  function(err, rows) {
    if (!err) {
      if (rows.length == 0) {
        connection.query('insert into tb_cliente_imovel_construcao (cliente, ano_construcao,'+ 
        'area_total, area_privativa, quartos, suites, garagens, mobiliada, churrasqueira,'+ 
        'infra_ar_cond, piso, teto, reboco, murro, portao, quintal_larg, quintal_comp, andar'+ 
        ') values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.cliente, data.ano_construcao, data.area_total, data.area_privativa, data.quartos, 
        data.suites, data.garagens, data.mobiliada, data.churrasqueira, data.infra_ar_cond,
        data.piso, data.teto, data.reboco, data.murro, data.portao, data.quintal_larg, 
        data.quintal_comp, data.andar], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error mensage: '+err)
        })
      }else {
        connection.query('update tb_cliente_imovel_construcao set ano_construcao=?, area_total=?,'+
        ' area_privativa=?, quartos=?, suites=?, garagens=?, mobiliada=?, churrasqueira=?,'+ 
        ' infra_ar_cond=?, piso=?, teto=?, reboco=?, murro=?, portao=?, quintal_larg=?,'+
        ' quintal_comp=?, andar=? where cliente=?', 
        [data.ano_construcao, data.area_total, data.area_privativa, data.quartos, data.suites, 
          data.garagens, data.mobiliada, data.churrasqueira, data.infra_ar_cond, data.piso, data.teto, 
          data.reboco, data.murro, data.portao, data.quintal_larg, data.quintal_comp, data.andar, 
          data.cliente], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error mensage: '+err)
        })
      }   
    }
  })
}

function cliente(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect();
  connection.query("SELECT * from tb_cliente_imovel_construcao where cliente="+cod, 
  function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router