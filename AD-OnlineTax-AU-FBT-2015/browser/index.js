'use strict';

var run = require('../lib/run'),
  querystring = require('querystring')

window.$ = window.jQuery = require('jquery')

require('angular')
require('bootstrap')
require('./iframeResizer-contentWindow')
require('./source-selection')
require('./controller')

// set the document domain to the host from the parent
var host = querystring.parse((window.location.search || '?').substring(1)).host
if (host) {
  window.document.domain = host
}

module.exports = run
