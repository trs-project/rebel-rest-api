'use strict';
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = require("./server.js");
const log = require("../utils/logger");
const checkAPI = require("../utils");
const config = require("../config.json");
const APIKEY = process.cwd() + "/utils/APIKEY.json"
const app = express();
const getIP = require('ipware')().get_ip;
const fs = require('fs');

// Global variables setup
global.checkAPI = checkAPI.check_api_key;
global.config = config;
global.APIKEY = APIKEY;
global._404 = process.cwd() + '/public/_404.html';
global.home = process.cwd() + '/public/home.html';
global.css = process.cwd() + '/public/styles.css';
global.docs = process.cwd() + '/public/docs.html';

app.use(helmet());
app.use(express.json());
app.use(cors());

// Middleware: IP check, Security, and Logging
app.use(function (req, res, next) {
    var ipInfo = getIP(req);
    var block = require("../utils/block-ban/block.js")(ipInfo.clientIp);
    
    if (block == true) return res.status(403).send("Your IP is blocked!");

    var limit = require("../utils/block-ban/limit-request.js")(ipInfo.clientIp);
    var type = global.config.ADMIN.includes(ipInfo.clientIp) ? 'ADMIN' : 'IP';
    
    log(`${type}: ${ipInfo.clientIp} - Requested path: ${decodeURIComponent(req.url)}`, 'REBEL-STATUS');
    next();
});

app.use("/", server);
app.set("json spaces", 4);

// Global Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "Internal Server Error"
    });
});

app.set('port', (process.env.PORT || 8888));

// Public Routes
app.get('/', (request, response) => {
    response.sendFile(global.home);
});

app.get('/styles.css', (request, response) => {
    response.sendFile(global.css);
});

app.get('/docs', (request, response) => {
    response.sendFile(global.docs);
});

// Server Startup
const port = app.get('port');
app.listen(port, () => {
    log(`REBEL API is running, server is listening on ${port}`, 'HOST UPTIME');
});