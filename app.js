
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
  uf = require('./routes/uf'),
  teste = require('./routes/teste'),
  cidade = require('./routes/cidade'),
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
app.get('/teste', teste.index);

app.get('/dados/uf/AllRecords', uf.AllRecords);

app.post('/dados/cidade/search_nome', cidade.search_nome);
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
