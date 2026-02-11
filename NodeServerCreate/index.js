const { log } = require('console');
const http = require('http');

const hostname = '127.0.0.1';

const portnumber = 3300;


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    console.log(req.url);

    res.setHeader('content-type', 'text/plain');
    if (req.url === '/') {
        res.end('Hello node');
    } else if (req.url === '/users') {
        res.end('Users page')
    } else {

        res.end('404 Not Found');
    }


})

server.listen(portnumber, hostname, () => {
    console.log("Server running on port 30000");
})