// node/server.js
const axios = require('axios');
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve HTML page
        const htmlPath = path.join(__dirname, '../html/index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlContent);
    } else if (req.url === '/getFromPython') {
        // Make a request to Python server
        axios.get('http://localhost:5000/api/py')  // Assuming Python server is running on port 5000
            .then(response => {
                const result = response.data.result;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(`<h1>Result from Python:</h1><p>${result}</p>`);
            })
            .catch(error => {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            });
    } else {
        // Handle other routes
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Node.js server is running at http://localhost:${port}`);
});
