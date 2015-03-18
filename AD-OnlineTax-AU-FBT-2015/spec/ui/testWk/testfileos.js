 
//sucess to run 

 //http://www.sitepoint.com/accessing-the-file-system-in-node-js/

 
var fs = require("fs");
var fileName = "packageji.json";
 var myPath ="/home/online/webdriverio-test/AD-OnlineTax-AU-FBT-2015/";


var data = fs.readFileSync(myPath+fileName, "utf8");
 
console.log(data);
console.log("********");
 fs.readFile(myPath+fileName, "utf8", function(error, data) {
  console.log(data);
});
 console.log("********");

fs.watch(myPath+fileName, {
  persistent: true
}, function(event, filename) {
  console.log(event + " event occurred on " + filename);
});
console.log("********");


fs.exists(myPath+fileName, function(exists) {
  if (exists) {
    fs.stat(myPath+fileName, function(error, stats) {
      fs.open(myPath+fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);
 
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);
 
          console.log(data);
          fs.close(fd);
        });
      });
    });
  }
});