/**
 * Node.js & Express Production Server for Portfolio + Multi-Project Serverless APIs
 * Compatible with Render, Railway, VPS, or local testing via `node server.js`
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const chatHandler = require('./api/chat.js');
const goldAssayHandler = require('./api/gold-assay.js');
const healthPredictHandler = require('./api/health-predict.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Helper response wrapper for serverless API handlers
  const customRes = {
    setHeader: (name, value) => res.setHeader(name, value),
    writeHead: (code, headers) => res.writeHead(code, headers),
    status: function (code) {
      res.statusCode = code;
      return this;
    },
    json: function (data) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    },
    end: (data) => res.end(data)
  };

  // Route API requests to their respective handlers
  if (pathname === '/api/chat') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      req.body = body ? JSON.parse(body) : {};
      chatHandler(req, customRes);
    });
    return;
  }

  if (pathname === '/api/gold-assay') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      req.body = body ? JSON.parse(body) : {};
      goldAssayHandler(req, customRes);
    });
    return;
  }

  if (pathname === '/api/health-predict') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      req.body = body ? JSON.parse(body) : {};
      healthPredictHandler(req, customRes);
    });
    return;
  }

  // Static File Serving
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (err2, stats2) => {
      if (err2 || !stats2.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Akeel Ahmad Peerzada Portfolio & Projects Platform running on http://localhost:${PORT}`);
});
