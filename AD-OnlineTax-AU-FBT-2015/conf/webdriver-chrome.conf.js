'use strict';

module.exports = {
  port: process.env.SELENIUM_PORT || global.seleniumPort || 4444,
  desiredCapabilities: {
    browserName: process.env.SELENIUM_BROWSER || 'chrome'
    //browserName: 'phantomjs'
  },
  //detach: true,
  ngRoot: 'body'  // main application selector
};
