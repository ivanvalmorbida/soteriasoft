var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/cidade/cidade_nome', cidade_nome)
router.get('/cidade/cidade_estado_nome', cidade_estado_nome)

function cidade_todas(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('select codigo,nome from tb_cidade order by nome', function(err, rows) {
    if (!err)
      res.json({cidade_todas: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cidade_estado(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('select ci.codigo, ci.nome from tbcep as ce'+
  ' inner join tb_cidade as ci on ce.cidade=ci.codigo'+
  ' where ce.uf=? group by ci.codigo, ci.Nome'+
  ' order by ci.Nome;', [data.uf], function(err, rows) {
    if (!err)
      res.json({RecordsOfState: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cidade_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt

  connection.connect()
  connection.query("select codigo,nome from tb_cidade where nome like '"+
  txt+"%' order by nome LIMIT 20", function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cidade_estado_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt
  var est = req.query.est

  connection.connect()
  connection.query("select ci.codigo, ci.nome from tb_cidade as ci"+
  " where ci.codigo in(select cidade from tb_cep where estado=?)"+
  " and ci.nome like '"+txt+"%' order by ci.nome LIMIT 20", 
  [est], function(err, rows) {
    if (!err)
      return res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router

/*
function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
<<<<<<< HEAD
  connection.query("select * from tb_cidade order by nome;", function(err, rows) {
=======
  connection.query("select * from tb_cidade order by nome", function(err, rows) {
>>>>>>> aa223c9819d347b345a5cd6bf37ce13d2d70b739
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
<<<<<<< HEAD
          nome: {type: String}
=======
          nome: {type: String},
>>>>>>> aa223c9819d347b345a5cd6bf37ce13d2d70b739
        })
        var Cidade = mongoose.model('Cidade', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].Codigo)
          a = new Cidade({
            id: rows[i].Codigo,
            nome: rows[i].Nome
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
<<<<<<< HEAD
}*/
=======
}
*/
>>>>>>> aa223c9819d347b345a5cd6bf37ce13d2d70b739
