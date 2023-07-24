import express from 'express';
import http from 'http';
import('./database/index.js');
import { initSocket } from './socket/index.js';
const app = express();
const server = http.createServer(app);
initSocket(server);
const port = 4777;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
