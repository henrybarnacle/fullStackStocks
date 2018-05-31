var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

var logger = require('morgan');
var bodyParser = require('body-parser');
const config = require('./config/database');


var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://henrybarnacle:henrybarnacle@ds145380.mlab.com:45380/myportfolio', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var stock = require('./routes/stock');
var app = express();

const users = require('./routes/users');

app.use(cors());





app.use(express.static(path.join(__dirname, 'dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Express session middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  
}));


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);


app.use('/stocks', express.static(path.join(__dirname, 'dist')));
app.use('/stock', stock);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;