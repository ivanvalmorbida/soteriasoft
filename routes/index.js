var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");

const mongoose = require('mongoose');

const uri = "mongodb+srv://ivan:ivanluis@cluster0-rqbkq.mongodb.net/ivan?retryWrites=true&w=majority";
//mongodb+srv://ivan:*****@cluster0-rqbkq.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true

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
  var ati = req.body.ati

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…')

    var atividadeeconomicaSchema = new mongoose.Schema({
      id: {type: Number},
      setor_id: {type: Number},
      subsetor_id: {type: Number},
      atividade: {type: String},
      descricao: {type: String}
    })
    var AtividadeEconomica = mongoose.model('AtividadeEconomica', atividadeeconomicaSchema)

    for (i = 0; i < ati.length; i++) {
      console.dir(ati[i].codigo)
      a = new AtividadeEconomica({
        id: ati[i].codigo,
        setor_id: ati[i].setor,
        subsetor_id: ati[i].subsetor,
        atividade: ati[i].atividade,
        descricao: ati[i].descricao
      })

      a.save()
    }
/*    var thor = new Movie({
      title: 'Spider Man',
      rating: 'PG-13',
      releaseYear: '2012',  // Note o uso de String ao inves de Number
      hasCreditCookie: true
    });
    
    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });
*/
  })
  .catch(err => console.log(err))

}

function teste(req, res) { 
  res.render('teste');
}

module.exports = router;
