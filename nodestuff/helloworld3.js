function readFile(fileName) {
  return ASQ(function (done) {
    var stream = fs.createReadStream(fileName);
    var contents = "";

    stream.pipe(fs.createWriteStream(fileName+'.backup'));

    stream.on('data', function (chunk) {
      contents += chunk;
    });
    stream.on('end', function () {
      done(contents);
    })
  })
}

function delayMsg(done, contents) {
  setTimeout(()=>{
    done(contents);
  }, 1000)
}

function say(fileName) {
  return readFile(fileName)
    .then(delayMsg);
}

var fs = require('fs');
var ASQ = require('asynquence');
require('asynquence-contrib');

module.exports.say = say;