function say(fileName, cb) {
  fs.readFile(fileName, function (err, contents) {
    if(err){
      return cb(err);
    } else {
      setTimeout(function () {
        return cb(null, contents);
      }, 1000)
    }
  });
}

var fs = require('fs');

module.exports.say = say;