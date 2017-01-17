var host = 'localhost';
var port = 8006;
var http = require('http');

var http_serv = http.createServer(
  handleHttp
).listen(port, host);

var ASQ = require('asynquence');

function handleHttp(req, res) {
  if(req.method === 'GET') {
    if(req.url === "/") {
      res.writeHead(200, {'Content-type': 'text/plain'});
      ASQ((done)=>{
        setTimeout(()=>{
          let c = Math.random().toString();
          res.write('c is '+c);
          done(c);
        }, 100)
      })
        .then(function (done, msg) {
          setTimeout(()=>{
            done('Hello world' + msg);
          }, 3000)
        })
        .val((msg)=>{
          res.end(msg);
        });
    }
  } else {
    res.writeHead(403);
    res.end();
  }
}

