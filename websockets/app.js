const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const app = express()
const port = 80

app.use('/', express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

var data = "Real-Time Update 1";
var number = 1;

wss.on('connection', ws => {
  
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })

  var interval = setInterval(function(){
    data = "Real-Time Update "+number;
    console.log("SENT: "+data);
    ws.send(data)
    number++;
  }, randomInteger(2,9)*1000);  

  ws.on('close', function close() {
    clearInterval(interval);
  });
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
