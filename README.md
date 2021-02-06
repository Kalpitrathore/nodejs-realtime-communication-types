##Introduction
In this article, We will going to talk about various ways of Real-Time Data Communication techniques. 

Real-Time Communication is a mode of telecommunication where all the connected clients can exchange information instantly or with negligible transmission delay. There are various techniques by which, We can exchange information between client & server in real-time, Some are:-

##Techniques

1. Polling
2. Server Sent Events
3. Web Sockets

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ejq4nvu0a560j5hyh7wp.png)

###1. Polling

* It is a type of "Client Pull" architecture where client constantly request the server for updates at certain regular intervals.

* Client waits for a particular time, then request the server for new updates.

* It is kind of half-duplex or unidirectional communication, Where only one direction transmission is allowed at a time.

* It is based on HTTP protocol.

* High latency transmission.

* Browser Support: To receive or send "Polling" updates at the client side, We will use XMLHttpRequest JavaScript API whose browser support can be found on [caniuse](https://caniuse.com/mdn-api_xmlhttprequest).

**Let's implement this technique in Node.js**

1) Open a terminal & create a folder *polling*
```
mkdir polling && cd polling
```

2) Now initialize npm in the folder
```
npm init -y
```

3) Create *app.js* file & write some code in it.
```
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
```

4) Install the required dependencies or libraries.
```
npm install --save express
```

5) Create *public* folder.
```
mkdir public && cd public
```

6) Create *html* folder inside *public* folder.
```
mkdir html && cd html
```

7) Create *index.html* file inside the public folder & write some code in it.
```
<html>
    <head>
        <title>Polling</title>
    </head>
    <body>
        <div id="updates"></div>
    </body>
    <script type="text/javascript">
        
        var interval = setInterval(function(){
            getUpdates();
        }, 5000);

        function getUpdates()
        {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/", true);
            xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {                    
                    document.getElementById('updates').innerHTML = document.getElementById('updates').innerHTML + "Received: "+JSON.parse(xhr.responseText).update+"</br>";
                }
            }
            };
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
        }
    </script>
</html>
```

8) Execute *app.js* file
```
//if you are inside html folder then go to your root project directory
cd ../..

//Now execute the app.js file
node app.js
```
9) Open a browser & point to http://localhost/html/index.html

We have successfully implemented the *Polling* technique in Node.js. As you can see it's transmission latency is very high.

###2. Server Sent Events

* It is a type of "Server Push" architecture, Where server instantly pushes the updates to client whenever it receives new information.

* Initially client sends the handshake request to server, After handshaking or establishing the connection, Client is not allowed to send data to server, Only server can push updates to client.

* It is a kind of half-duplex or unidirectional communication. But after handshaking, only server is allowed to send data.

* It is based on HTTP protocol.

* Provide low latency transmission.

* To receive or send "Server Sent Events" updates at client side, We will going to use EventSource JavaScript API whose browser support can be found on [caniuse](https://caniuse.com/mdn-api_eventsource).

**Let's implement this technique in Node.js**

1) Open a terminal & create a folder *server-sent-events*
```
mkdir server-sent-events && cd server-sent-events
```

2) Now initialize npm in the folder
```
npm init -y
```

3) Create *app.js* file & write some code in it.
```
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
```

4) Install the required dependencies or libraries.
```
npm install --save express
```

5) Create *public* folder.
```
mkdir public && cd public
```

6) Create *html* folder inside *public* folder.
```
mkdir html && cd html
```

7) Create *index.html* file inside the public folder & write some code in it.
```
<html>
    <head>
        <title>Server Sent Events</title>
    </head>
    <body>
        <div id="updates"></div>
    </body>
    <script type="text/javascript">    

        var source = new EventSource('/server-sent-events')

        source.addEventListener('message', function(e) {            
            document.getElementById('updates').innerHTML = document.getElementById('updates').innerHTML + "Received: "+e.data+"</br>";
        }, false)

    </script>
</html>
```

8) Execute *app.js* file
```
//if you are inside html folder then go to your root project directory
cd ../..

//Now execute the app.js file
node app.js
```
9) Open a browser & point to http://localhost/html/index.html

We have successfully implemented the *Server Sent Events* technique in Node.js. We can use this protocol where "Server to Client Transmission" is our only concern.

###3. Web Sockets

* It is a type of "Server Push" architecture.

* After handshaking, both client & server are allowed to send or receive information at any time.

* It is a kind of full-duplex or bidirectional communication where both client & server transmit & receive information simultaneously.

* It is based on HTTP & TCP/IP Protocol.

* Provide low latency transmission.

* To receive or send "Web Sockets" updates at client side, We will going to use WebSocket JavaScript API whose browser support can be found on [caniuse](https://caniuse.com/mdn-api_websocket).

**Let's implement this technique in Node.js**

1) Open a terminal & create a folder *websockets*
```
mkdir websockets && cd websockets
```

2) Now initialize npm in the folder
```
npm init -y
```

3) Create *app.js* file & write some code in it.
```
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
```

4) Install the required dependencies or libraries.
```
npm install --save express
npm install --save ws
```

5) Create *public* folder.
```
mkdir public && cd public
```

6) Create *html* folder inside *public* folder.
```
mkdir html && cd html
```

7) Create *index.html* file inside the public folder & write some code in it.
```
<html>
    <head>
        <title>Server Sent Events</title>
    </head>
    <body>
        <div id="updates"></div>
    </body>
    <script type="text/javascript">    
        
        const connection = new WebSocket('ws://localhost:80')

        connection.onmessage = e => {
            document.getElementById('updates').innerHTML = document.getElementById('updates').innerHTML + "Received: "+e.data+"</br>";
        }

    </script>
</html>
```

8) Execute *app.js* file
```
//if you are inside html folder then go to your root project directory
cd ../..

//Now execute the app.js file
node app.js
```
9) Open a browser & point to http://localhost/html/index.html

We have successfully implemented the *Web Socket* technique in Node.js.


##Summary

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/sjyt6xl0rzi1c5gxlrxl.png)


##Conclusion

There are the most used techniques we have disscussed, Apart from these there are hundreds of techniques available for real-time data transmission.

You can find whole project on [GitHub](https://github.com/Kalpitrathore/nodejs-realtime-communication-types.git).

For more update, Follow me on [Twitter](https://twitter.com/kalpitrathore) or [GitHub](https://github.com/Kalpitrathore).
