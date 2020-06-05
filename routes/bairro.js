var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

//router.get('/bairro/bairro_tudo', bairro_tudo)
router.get('/bairro/bairro_nome', bairro_nome)
router.get('/bairro/bairro_cidade', bairro_cidade)
router.get('/bairro/bairro_cidade_nome', bairro_cidade_nome)

function bairro_cidade(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('Select ba.codigo, ba.nome from tbcep as ce'+
  ' inner join tb_bairro as ba on ce.bairro=ba.codigo'+
  ' where ce.uf=? And ce.cidade=? group by ba.codigo, ba.Nome'+
  ' order by ba.Nome;', [data.uf, data.ci], function(err, rows) {
    if (!err)
      res.json({RecordsOfCity: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function bairro_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo,nome from tb_bairro Where nome like '"+
  txt+"%' order by Nome LIMIT 20;", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function bairro_cidade_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt
  var est = req.query.est
  var cid = req.query.cid

  connection.connect()
  connection.query("Select ba.codigo, ba.nome from tb_bairro as ba"+
  " where ba.codigo in(select bairro from tb_cep where estado=? and cidade=?)"+
  " and ba.nome like '"+txt+"%' order by ba.Nome LIMIT 20", 
  [est, cid], function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}
/*
function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select codigo,nome from tb_bairro order by Nome;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          nome: {type: String}
        })
        var Bairro = mongoose.model('Bairro', Schema)
    
        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new Bairro({
            id: rows[i].codigo,
            nome: rows[i].nome
          })
    
          a.save()
        }
      })
      .catch(err => console.log(err))
    }
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}
*/
module.exports = router