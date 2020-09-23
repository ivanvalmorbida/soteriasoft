var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");
var mysql   = require('mysql')

const mongoose = require('mongoose');

//const uri = "mongodb+srv://ivan:ivanluis@cluster0-rqbkq.mongodb.net/ivan?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/ivan"

router.get('/teste', teste)
router.post('/exportar', exportar)
router.get('/', index)
router.get('*', index)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('index', {empresa: settings.empresa});
}

function exportar(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select * from tb_pessoa order by nome;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          tipo: {type: String},
          nome: {type: String},
          cep: {type: String},
          estado: {type: Number},
          cidade: {type: Number},
          bairro: {type: Number},
          endereco: {type: Number},
          numero: {type: String},
          complemento: {type: String},
          obs: {type: String},
          cadastro: {type: Date}
        })
        var Pessoa = mongoose.model('Pessoa', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new Pessoa({
            id: rows[i].codigo,
            tipo: rows[i].tipo,
            nome: rows[i].nome,
            cep: rows[i].cep,
            estado: rows[i].estado,
            cidade: rows[i].cidade,
            bairro: rows[i].bairro,
            endereco: rows[i].endereco,
            numero: rows[i].numero,
            complemento: rows[i].complemento,
            obs: rows[i].obs,
            cadastro: rows[i].cadastro
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

function teste(req, res) { 
  res.render('teste');
}

module.exports = router;
