/**
 * Created by online on 24/02/15.
 */

var fs = require("fs");

exports = module.exports = {};

exports.scan = function(dir, depth, done) {
  depth--;
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          if (depth !== 0) {
            var ndepth = (depth > 1) ? depth-1 : 1;
            exports.scan(file, ndepth, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            next();
          }
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

exports.match = function(query, files){
  var matches = [];
  files.forEach(function(name) {
    if (name.indexOf(query) !== -1) {
      matches.push(name);
    }
  });
  return matches;
}
