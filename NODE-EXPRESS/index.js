//  express = require('express'),
//  http = require('http');

//  hostname = 'localhost';
//  port = 3000;

//  app = express();

//  app.use((req, res, next) => {
//      console.log(req.headers);
//      res.statusCode = 200;
//      res.setHeader('Content-Type', 'text/html');
//      res.end('<html><body><h1>This is an Express Server</h1></body></html>');

//  });

//  server = http.createServer(app);

//  server.listen(port, hostname, () => {
//      console.log(`Server running at http://${hostname}:${port}/`);
//  });

//-----------------------------------------------------------------------------------------

express = require('express'),
    http = require('http');
morgan = require('morgan');

hostname = 'localhost';
port = 3000;

// this line says our application is going to used express framework. when we write this line ,
// express give us buch of method to create server
app = express();

// "App use Morgan with the development". So, this is the development version. So,
//  it will print out additional information to the screen as required
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    // we dont neet to prit req header cz morgan will get sufficiend log
    // console.log(req.headers);  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});