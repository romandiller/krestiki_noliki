'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config.json');
const favicon = require('express-favicon');
const staticAsset = require('static-asset');
const Db = require('./db');
const Ai = require('./ai');

const app = express();
const db = new Db();
const ai = new Ai();

app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {

	res.render('index.ejs');

});

app.use((req, res, next) => {

  next(404);

});

app.use((err, req, res, next) => {

    res.status(err.status || 500);

    res.render('error');

});

const server = http.createServer(app);

server.listen(config.port, config.host, () => {
 
  console.log(`Сервер запущен: порт( ${config.port} ), хост ( ${config.host} )...`);

});

const sockets = require('./sockets')(server, ai, db);