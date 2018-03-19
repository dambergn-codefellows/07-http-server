'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer();

server.listen(PORT, () => {
    console.log('Lisening on port:', PORT, 'CTRL+C to close.')
})