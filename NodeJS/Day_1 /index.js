import { createServer } from 'node:http';
import { styleText } from 'node:util';
import { getSysInfo } from './sys-info.js';

const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
    
    if(req.url === '/' && req.method === 'GET'){
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <a href='http://127.0.0.1:3000/sys-info'>Get System Information</a>
            <br>
            <a href='http://127.0.0.1:3000/exit'>Close Server</a>
            `);
        res.statusCode = 200;
    }

    if(req.url === '/sys-info' && req.method === 'GET'){
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify(getSysInfo()));
        res.statusCode = 200;
    }

    if(req.url === '/exit' && req.method === 'GET'){
        console.log(styleText(['red', 'bold'] , 'Server is closed by user'))
        process.exit(0)
    }

  
});
server.listen(port, hostname, () => {
  console.log(styleText(['green', 'bold'],`Server running at http://${hostname}:${port}/`));
});

