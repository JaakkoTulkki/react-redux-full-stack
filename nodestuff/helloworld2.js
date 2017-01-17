function readFile(fileName) {
  var sq = ASQ();
  console.log('filename is ', fileName);
  fs.readFile(fileName, sq.errfcb());

  return sq;
}

function delayMsg(done, contents) {
  setTimeout(()=>{
    done(contents);
  }, 1000)
}

function say(fileName) {
  return readFile(fileName)
    .then(delayMsg)
    .then(function (done, contents) {
      console.log('in cb!!!', contents.toString());
      done.fail("Error: "+ contents.toString());
    });
}

var fs = require('fs');
var ASQ = require('asynquence');
require('asynquence-contrib');

module.exports.say = say;