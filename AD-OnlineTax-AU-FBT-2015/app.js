/**
 * Created by online on 24/02/15.
 */

//# !/usr/bin/env node

var tags = require("./spec/methods/tags.js");
var search = require("./spec/methods/search.js");


var defaults = {
  path: ".",
  query: "",
  depth: 2
}
var replacements = {
  p: "path",
  q: "query",
  d: "depth",
  h: "help"
}

tags = tags.parse(process.argv, defaults, replacements);

if (tags.help) {
  console.log("Usage: ./app.js -q=query [-d=depth] [-p=path]");
} else {
  search.scan(tags.path, tags.depth, function(err, files) {
    search.match(tags.query, files).forEach(function(file){
      console.log(file);
    });
  });
}


/**
 You can now make your script executable (chmod +x app.js on a Unix system) and then run it like so:

 1
 ./app.js -q=".js"
 http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018

 online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015$ ./app.js -q=".js"
 ./app.js: line 1: /backupcji: Is a directory
 ./app.js: line 2: app.js: command not found
 ./app.js: line 3: browser/: Is a directory
 ./app.js: line 5: //#: No such file or directory
 ./app.js: line 7: syntax error near unexpected token `('
 ./app.js: line 7: `var tags = require("./spec/methods/tags.js");'
 online@OnlineTax-L1:~/webdriverio-test/AD-OnlineTax-AU-FBT-2015$
 */
