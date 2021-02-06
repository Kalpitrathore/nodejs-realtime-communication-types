const express = require('express')
const app = express()
const port = 80

app.use('/', express.static('public'));

var data = "Real-Time Update 1";
var number = 1;

app.get('/', (req, res) => {
  res.send({"update": data})
});

var interval = setInterval(function(){
    data = "Real-Time Update "+number;
    console.log("SENT: "+data);
    number++;
}, randomInteger(2,9)*1000);

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
