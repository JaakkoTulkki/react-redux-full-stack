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

var hello = require('./helloworld3');

hello.say(args.file)
  .val(function (contents) {
    console.log(contents.toString())
  }).or(function (err) {
    console.log(err);
});
