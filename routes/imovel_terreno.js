var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/imovel_terreno/gravar', gravar)
router.post('/imovel_terreno/imovel', imovel)

function gravar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body
  
  data.cep = data.cep.replace("-", "")

  connection.connect()
  connection.query('select imovel from tb_imovel_terreno where imovel=?', [data.imovel], 
  function(err, rows) {
    if (!err) {
      if (data.estado==undefined){data.estado=0}
      if (data.cidade==undefined){data.cidade=0}
      if (data.bairro==undefined){data.bairro=0}
      if (data.endereco==undefined){data.endereco=0}
      if (rows.length == 0) {
        connection.query('insert into tb_imovel_terreno (imovel, cep, estado, cidade, bairro,'+
        ' endereco, numero, complemento, area_terreno, frente, fundo, lateral1, lateral2,'+
        ' gabarito, esquina) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
        [data.imovel, data.cep, data.estado, data.cidade, data.bairro, data.endereco, 
        data.numero, data.complemento, data.area_terreno, data.frente, data.fundo, data.lateral1,
        data.lateral2, data.gabarito, data.esquina], function(err, rows) {
          if (!err)
            res.json({dados: rows})      
          else
            console.log('Error mensage: '+err)
          
          connection.end()
        })
      }   
      else {
        connection.query('update tb_imovel_terreno set cep=?, estado=?, cidade=?, bairro=?,'+
        ' endereco=?, numero=?, complemento=?, area_terreno=?, frente=?, fundo=?, lateral1=?, lateral2=?,'+
        ' gabarito=?, esquina=? where imovel=?',
        [data.cep, data.estado, data.cidade, data.bairro, data.endereco, 
        data.numero, data.complemento, data.area_terreno, data.frente, data.fundo, data.lateral1,
        data.lateral2, data.gabarito, data.esquina, data.imovel], function(err, rows2) {
          if (!err)
            res.json({dados: rows2})
          else
            console.log('Error mensage: '+err)
              
          connection.end()
        })
      }   
    }
    else
      console.log('Error mensage: '+err)
  })          
}

function imovel(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var cod = req.body.cod

  connection.connect()
  connection.query("SELECT i.*, u.nome as estado_, m.nome as cidade_,"+
  ' b.nome as bairro_, e.nome as endereco_ from tb_imovel_terreno i'+
  ' left join tb_estado u on u.codigo=i.estado'+
  ' left join tb_cidade m on m.codigo=i.cidade'+
  ' left join tb_bairro b on b.codigo=i.bairro'+
  ' left join tb_endereco e on e.codigo=i.endereco'+
  ' where i.imovel='+cod, function(err, rows, fields) {
    if (!err)
      res.json({dados: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router