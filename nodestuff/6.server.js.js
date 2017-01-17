var host = 'localhost';
var port = 8006;
var http = require('http');

var http_serv = http.createServer(
  handleHttp
).listen(port, host);

var ASQ = require('asynquence');

function handleHttp(req, res) {
  if(req.method === 'GET') {
    if(req.url === '/static') {
      req.url = "6.html";
      static_files.serve(req, res);
    }
  } else {
    res.writeHead(403);
    res.end();
  }
}

var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);


function handleIO(socket) {

  function disconnect() {
    console.log('client disconnected');
  }
  console.log('client connected');
  socket.on('disconnect', disconnect);
  // socket.on('sendit', ()=>{
  //   socket.emit('buttoncounter', ++counter);
  // })


}
var io = require('socket.io').listen(http_serv, handleIO);

io.on('connection', (socket)=>{
  var counter = 0;
  setInterval(function () {
    socket.emit('chicken', Math.random());
  }, 1000)
  socket.on('sendit', ()=>{
    socket.emit('buttoncounter', ++counter);
  })

});
