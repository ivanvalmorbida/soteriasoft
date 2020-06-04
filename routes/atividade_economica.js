var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.get('/atividade_economica/atividade_economica_descricao', ativ_econ_descricao)
router.get('/atividade_economica/atividade_economica_todas', atividade_economica_todas)

function atividade_economica_todas(req, res) {
    var connection = mysql.createConnection(settings.dbConect)

    connection.connect()
    connection.query('SELECT * from tb_atividade_economica order by descricao', function(err, rows, fields) {
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
  var atividadeeconomicaSchema = new mongoose.Schema({
    id: {type: Number},
    setor_id: {type: Number},
    subsetor_id: {type: Number},
    atividade: {type: String},
    descricao: {type: String}
  })
  var AtividadeEconomica = mongoose.model('AtividadeEconomica', atividadeeconomicaSchema)
*/