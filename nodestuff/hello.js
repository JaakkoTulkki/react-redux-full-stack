#!/usr/bin/env node

function printHelp() {
  console.log("hey this is is the help");
  console.log("usage:          --name");
  console.log('file={NAME}     read the file ');
};



var args = require('minimist')(process.argv.slice(2), { string: 'file' });

if(args.h){
  printHelp();
  process.exit(1);
}

var hello = require('./helloworld');

hello.say(args.file, function (err, contents) {
  if(err){
    console.log(err);
  } else {
    console.log(contents.toString());
  }
});
console.log('should be printed first');

