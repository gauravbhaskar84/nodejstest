const http = require('http');
const os = require('os');

console.log("App server starting...");

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  response.writeHead(200);
  response.end("This is version 2 running in pod " + os.hostname() + "\n");
};

var www = http.createServer(handler);

www.listen(8080);