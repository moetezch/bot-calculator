import express from 'express';
import http from 'http';
import('./database/index.js');

const app = express();
const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
