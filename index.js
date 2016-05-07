const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

app.use(express.static('public/js/'))
app.use(express.static('public/css/'))


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);