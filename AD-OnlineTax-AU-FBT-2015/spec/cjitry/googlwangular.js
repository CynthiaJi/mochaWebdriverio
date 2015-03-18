/**
 * Created by online on 19/02/15.
 */

var webdriverjsAngular = require('webdriverjs-angular');
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  },
  ngRoot: 'body' // main application selector
};
webdriverjsAngular
  .remote(options)
  .init()
  .url('http://www.google.com')
  .title(function(err, res) {
    console.log('Title was: ' + res.value);
  })
  .end();
