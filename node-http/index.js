 http = require('http');
 fs = require('fs');
 path = require('path');

 hostname = 'localhost';
 port = 3000;

 //  server = http.createServer((req, res) => {
 //      console.log(req.headers);

 //      res.statusCode = 200;
 //      res.setHeader('Content-Type', 'text/html');
 //      res.end('<html><body><h1>Hello, World!</h1></body></html>');
 //  });

 server = http.createServer((req, res) => {
     console.log('Request for ' + req.url + ' by method ' + req.method);

     if (req.method == 'GET') {
         var fileUrl;
         if (req.url == '/') fileUrl = '/index.html';
         else fileUrl = req.url;

         var filePath = path.resolve('./public' + fileUrl);
         fileExt = path.extname(filePath);
         if (fileExt == '.html') {
             fs.exists(filePath, (exists) => {
                 if (!exists) {
                     res.statusCode = 404;
                     res.setHeader('Content-Type', 'text/html');
                     res.end('<html><body><h1>Error 404: ' + fileUrl + ' is not found</h1></body></html>');
                     return;
                 }
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'text/html');
                 fs.createReadStream(filePath).pipe(res);
             });
         } else {
             res.statusCode = 404;
             res.setHeader('Content-Type', 'text/html');
             res.end('<html><body><h1>Error 404: ' + fileUrl + ' is not a HTML file</h1></body></html>');
         }
     } else {
         res.statusCode = 404;
         res.setHeader('Content-Type', 'text/html');
         res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
     }

 });

 server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}/`);
 });