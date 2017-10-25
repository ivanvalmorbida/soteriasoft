
var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
	http = require('http'),
  path = require('path'),
  session = require('express-session'),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  server = http.createServer(app),
	io = require('socket.io').listen(server),
  settings = require("./settings"),
  routes = require('./routes/index'),
  users = require('./routes/users'),
  cep = require('./routes/cep'),
  estado = require('./routes/estado'),
  cidade = require('./routes/cidade'),
  bairro = require('./routes/bairro'),
  endereco = require('./routes/endereco'),
  pessoa = require('./routes/pessoa'),
  nacionalidade = require('./routes/nacionalidade'),
  estado_civil = require('./routes/estado_civil'),
  cbo = require('./routes/cbo'),
  atividade_economica = require('./routes/atividade_economica'),
  pessoa_email = require('./routes/pessoa_email'),
  pessoa_fone = require('./routes/pessoa_fone'),  
  pessoa_fisica = require('./routes/pessoa_fisica'),  
  pessoa_juridica = require('./routes/pessoa_juridica'),  
  imovel = require('./routes/imovel'),  
  teste = require('./routes/teste'),
  app = module.exports = express();

app.use(cookieParser('soteriasoft'));
app.use(bodyParser());

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID      : settings.facebook_api_key,
    clientSecret  : settings.facebook_api_secret ,
    callbackURL   : settings.facebook_callback_url,
    profileFields : ['id','emails', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      global.UserCod=0;
      global.UserEma=profile.emails[0].value;
      global.UserNom=profile.displayName;
      global.UserFac=profile.id;

      return done(null, profile);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID        : settings.google_api_key,
    clientSecret    : settings.google_api_secret ,
    callbackURL     : settings.google_callback_url,
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      global.UserCod=0;
      global.UserEma=profile.emails[0].value;
      global.UserNom=profile.displayName;
      global.UserGoo=profile.id;

      return done(null, profile);
    }
  )}
));

app.set('port', process.env.PORT || settings.webPort);
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '7C77-3D33-WppQ38S'}));
app.use(passport.initialize());
app.use(passport.session());

global.uploadFileName = 'temp.pdf'
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, global.uploadFileName);
    }
});

var upload = multer({ storage: storage });
app.post('/multer', upload.single('file'), function (req, res) {
    res.end("File uploaded.");
});

app.get('/facebook/auth', passport.authenticate('facebook',{scope:'email'}));
app.get('/facebook/auth/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/' }),
  function(req, res) {res.redirect('/');}
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/google/auth', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/google/auth/callback',
  passport.authenticate('google', { successRedirect : '/', failureRedirect : '/'}),
  function(req, res) {res.redirect('/');}
);

app.use('/', routes);
app.use('/users', users);
app.get('/cep', cep.index);
app.get('/estado/estado_nome', estado.estado_nome);
app.get('/estado/estado_sigla', estado.estado_sigla);
app.get('/cidade/cidade_nome', cidade.cidade_nome);
app.get('/cidade/cidade_estado_nome', cidade.cidade_estado_nome);
app.get('/bairro/bairro_nome', bairro.bairro_nome);
app.get('/endereco/endereco_nome', endereco.endereco_nome);
app.get('/endereco/endereco_cidade_nome', endereco.endereco_cidade_nome);
app.get('/estado/estado_todos', estado.estado_todos);
app.get('/pessoa', pessoa.index);
app.get('/nacionalidade/nacionalidade_pais', nacionalidade.nacionalidade_pais);
app.get('/estado_civil/estado_civil_descricao', estado_civil.estado_civil_descricao);
app.get('/cbo/cbo_descricao', cbo.cbo_descricao);
app.get('/atividade_economica/atividade_economica_descricao', atividade_economica.atividade_economica_descricao);
app.get('/pessoa/pessoa_nome', pessoa.pessoa_nome);
app.get('/imovel', imovel.index);
app.get('/teste', teste.index);
app.get('/teste/dlg', teste.dialogo);

app.post('/cep/cep_cep', cep.cep_cep);
app.post('/cep/cep_endereco', cep.cep_endereco);
app.post('/cep/cep_gravar', cep.cep_gravar);
app.post('/cep/cep_apagar', cep.cep_apagar);

app.post('/pessoa/gravar', pessoa.gravar);
app.post('/pessoa/codigo', pessoa.codigo);
app.post('/pessoa/localizar', pessoa.localizar);

app.post('/pessoa_email/gravar', pessoa_email.gravar);
app.post('/pessoa_email/pessoa', pessoa_email.pessoa);

app.post('/pessoa_fone/gravar', pessoa_fone.gravar);
app.post('/pessoa_fone/pessoa', pessoa_fone.pessoa);

app.post('/pessoa_fisica/gravar', pessoa_fisica.gravar);
app.post('/pessoa_fisica/pessoa', pessoa_fisica.pessoa);

app.post('/pessoa_juridica/gravar', pessoa_juridica.gravar);
app.post('/pessoa_juridica/pessoa', pessoa_juridica.pessoa);

//app.get('/err404', err404.index);
app.get('*', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  res.redirect('/err404')
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.redirect('/');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server escutando na porta ' + app.get('port'));
});
