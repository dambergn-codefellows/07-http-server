'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    // console.log('url parsed:', req.url);
    // console.log('querystring parsed', req.url.query);

    // console.log('full request obj:', req);
    // console.log('req url:', req.url);
    // console.log('req method', req.method);

    // if (req.method === 'GET') { //test in terminal with: http :3000
    //     res.write('yo from serverland');
    //     res.end(); //end or app will hang
    // }

    // if (req.method === 'POST') { //test in terminal with: http POST :3000 name=nick
    //     parseBody(req, function(err) {
    //         if (err) return console.error(err);
    //         console.log('request body:', req.body);
    //         res.end(); //end or app will hang
    //     });
    // };

    // if (req.method === 'POST') { //test in terminal with: http POST :3000 name=nick
    //     console.log(req.body);// should console log undefined
    //     res.end(); //end or app will hang
    // };

    // //Version 1
    // if (req.method === 'GET' && req.url.pathname === '/cowsay') { //test in terminal with: http :3000/cowsay
    //     res.write(cowsay.say({ text: 'mooooooo'}));
    //     res.end(); //end or app will hang
    // }

    let root = `
    <!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
   <header>
     <nav>
       <ul> 
         <li><a href="/cowsay">cowsay</a></li>
       </ul>
     </nav>
   <header>
   <main>
     <!-- Lab 07 Cowsay HTTP Server -->
   </main>
  </body>
</html>
    `;

    let cowsayApp = (message) => {
        return `
        <!DOCTYPE html>
      <html>
        <head>
          <title> cowsay </title>
        </head>
        <body>
         <h1> cowsay </h1>
         <pre>
            ${message}
         </pre>
      </body>
      </html>
    `};

    if (req.method === 'GET') {
        res.writeHead(200, { //sucessfull status code.
            'Content-Type': 'text/html'
        });
        res.write(root);
        res.end(); //end or app will hang
    }

    // //Version 2
    // if (req.method === 'GET' && req.url.pathname === '/cowsay') { //test in terminal with: http :3000/cowsay text=='my cow says cool'
    //     res.writeHead(200, { //sucessfull status code.
    //         'Content-Type': 'text/plain'
    //     });
    //     let params = req.url.query;
    //     res.write(cowsay.say({ text: params.text }));
    //     res.end(); //end or app will hang
    // }

    //Version final for assignment.
    if (req.method === 'GET' && req.url.pathname === '/cowsay') { //test in terminal with: http :3000/cowsay text=='my cow says cool'
        res.writeHead(200, { //sucessfull status code.
            'Content-Type': 'text/html'
        });
        let params = req.url.query;
        res.write(cowsay.say({ text: params.text }));
        res.end(); //end or app will hang
    }

    if (req.method === 'POST' || req.method === 'PUT') { //test in terminal with: http POST :3000 name=nick
        parseBody(req, function (err) {                   // test in browser with: http://localhost:3000/cowsay?text=moomooo
            if (err) throw new Error('error parsing request body');
            console.log(req.body);// should console log undefined
            res.end(); //end or app will hang
        });
    };


    res.end(); //end or app will hang
});

server.listen(PORT, () => {
    console.log('Lisening on port:', PORT, 'CTRL+C to close.')
})