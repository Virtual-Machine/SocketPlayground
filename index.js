const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');
const phrase = fs.readFileSync('certs/phrase', 'utf8');

const credentials = {key: privateKey, cert: certificate, passphrase: phrase};
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('public/js/'))
app.use(express.static('public/css/'))
app.use(morgan('dev'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8000);
httpsServer.listen(8443);

console.log("localhost:8000 accepting http requests")
console.log("localhost:8443 accepting https requests")