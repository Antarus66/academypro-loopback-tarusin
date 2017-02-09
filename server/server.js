'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var io = require(__dirname + '/services/Sockets');

var app = module.exports = loopback();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(loopback.static(path.join(__dirname + '/../client')));


app.get('/', function(req, res, next) {
    res.render('todos', {});
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    var server = app.start();
    app.io = io.attach(server);
});
