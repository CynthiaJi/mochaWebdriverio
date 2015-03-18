'use strict';

//
// Set up form server and Selenium for local testing.
// Ignore this file when testing with externally deployed application and when using BrowserStack et al.
//

var Static = require('node-static'),
  http = require('http'),
  path = require('path'),
  portfinder = require('portfinder'),
  selenium = require('selenium-standalone');

var server,
  seleniumProcess;

before(function (done) {
  var file = new Static.Server(path.join(__dirname, '../../build/test'));
  server = http.createServer(function (req, res) {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }).listen(0, function (err) {
    if (err) { return done(err); }
    var port = global.serverPort = server.address().port;
    console.log('Static file server running on port %s', port);
    portfinder.getPort({
      port: 40001
    }, function (err, seleniumPort) {
      if (err) { return done(err); }
      selenium.start({
        version: '2.43.1',  // PhantomJS 1.9.8 doesn't support Selenium >= 2.44.0. Version also hardcoded in package.json postinstall script
        seleniumArgs: ['-port', seleniumPort]
      }, function (err, child) {
        if (err) { return done(err); }
        seleniumProcess = child;
        global.seleniumPort = seleniumPort;
        console.log('Selenium started on port %s', seleniumPort);
        done();
      });
    });
  });
});

after(function (done) {
  if (seleniumProcess) {
    try {
      seleniumProcess.kill();
    } catch (err) {
      console.error('Could not kill selenium process');
    }
  }
  if (server) {
    try {
      server.close(done);
    } catch (err) {
      console.error('Could not close static file server');
      done(err);
    }
  } else {
    done(new Error("Couldn't stop server as it wasn't running."));
  }
});
