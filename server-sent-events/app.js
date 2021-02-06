const express = require('express')
const app = express()
const port = 80

app.use('/', express.static('public'));

var data = "Real-Time Update 1";
var number = 1;

app.get('/server-sent-events', function(req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var interval = setInterval(function(){
        data = "Real-Time Update "+number;
        console.log("SENT: "+data);
        res.write("data: " + data + "\n\n")
        number++;
    }, randomInteger(2,9)*1000);

    // close
    res.on('close', () => {
        clearInterval(interval);
        res.end();
    });
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
