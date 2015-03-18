

exports.sanitize = function(word) {
    //return word.toLowerCase();
    return word.toLowerCase().replace(/-/g, ' ');
}

exports.info = function(callback) {
  var https = require('https');
  var options = {
    host: 'api.github.com',
    path: '/repos/sayanee/build-podcast',
    method: 'GET',
    headers: { 'User-Agent': 'sayanee' }
  };
  var str = '';


  https.request(options, function(response) {
    response.on('data', function(data) {
      str += data;
      //console.log(str);
    });

    response.on('end', function() {
      callback(JSON.parse(str));
      //console.log(str);
    })

    response.on('error', function(error) {
      console.log(error);
      callback();
    })
  })
  .end();

}


exports.infoLang = function(infoFunc, callback) {
    infoFunc(function(reply) {
        callback('Language: ' + reply.language);
    })
};

exports.tokenize = function(sentence) {
    return sentence.split(' ');
}