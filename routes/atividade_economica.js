var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/atividade_economica/atividade_economica_descricao', ativ_econ_descricao)
router.get('/atividade_economica/atividade_economica_todas', atividade_economica_todas)

function atividade_economica_todas(req, res) {
    var connection = mysql.createConnection(settings.dbConect)

    connection.connect()
    connection.query('SELECT * from tb_atividade_economica_setor order by setor', function(err, rows, fields) {
        if (!err)
            res.json({atividade_economica_todas: rows})
        else
            console.log('Error mensage: '+err)
    })
    connection.end()
}

function ativ_econ_descricao(req, res) {
    var connection = mysql.createConnection(settings.dbConect)
    var txt = req.query.txt

    connection.connect()
    connection.query("select codigo, atividade, descricao from tb_atividade_economica"+
    " where descricao like '"+txt+"%' order by descricao LIMIT 20", function(err, rows) {
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
  connection.query("select * from tb_atividade_economica order by descricao;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          setor_id: {type: Number},
          subsetor_id: {type: Number},
          atividade: {type: String},
          descricao: {type: String}
        })
        var AtividadeEconomica = mongoose.model('Atividade_Economica', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new AtividadeEconomica({
            id: rows[i].codigo,
            setor_id: rows[i].setor,
            subsetor_id: rows[i].subsetor,
            atividade: rows[i].atividade,
            descricao: rows[i].descricao

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




function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select * from tb_atividade_economica_setor order by setor;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          setor: {type: String}
        })
        var AtividadeEconomicaSetor = mongoose.model('Atividade_Economica_Setor', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new AtividadeEconomicaSetor({
            id: rows[i].codigo,
            setor: rows[i].setor
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




function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select * from tb_atividade_economica_subsetor order by subsetor;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          setor_id: {type: Number},
          subsetor: {type: String},
          descricao: {type: String}
        })
        var AtividadeEconomicaSubsetor = mongoose.model('Atividade_Economica_Subsetor', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new AtividadeEconomicaSubsetor({
            id: rows[i].codigo,
            setor_id: rows[i].setor,
            subsetor: rows[i].subsetor,
            descricao: rows[i].descricao
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
}*/