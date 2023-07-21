const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = 3000;


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
