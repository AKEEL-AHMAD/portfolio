/**
 * Node.js & Express Production Server for Portfolio + AI Chatbot API
 * Can be deployed to Render, Railway, Vercel, or run locally via `node server.js`
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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

// Master Knowledge Context
const AKEEL_SYSTEM_CONTEXT = `
You are "Akeel AI", the official intelligent AI portfolio assistant for Akeel Ahmad Peerzada.
• Name: Akeel Ahmad Peerzada
• Role: Cybersecurity Analyst, Threat Intel Platform Builder, and IoT Hardware Security Developer
• Location: Jammu & Kashmir, India (Open to Relocation & Remote Roles)
• Phone: +91 6006889027
• Email: peerakeel9027@gmail.com
• GitHub: https://github.com/AKEEL-AHMAD
• LinkedIn: https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/
• Flagship Project: AI-CTI (14-page SecOps platform, React/Tailwind, Node/Express/SQLite, JWT RBAC, VirusTotal/AbuseIPDB/AlienVault APIs, 13 automated CI tests).
• SIH 2025: National Finalist at IIT Kharagpur (Non-destructive gold assaying hardware using ESP32 & Arduino).
• Education: B.Tech/B.E. CSE at Anna University / NIET (CGPA 7.56), Diploma at Govt Polytechnic Srinagar (CGPA 7.0).
• Certifications: Deloitte Cyber Simulation, TATA Cybersecurity Analyst, Intel AI, Univ of Maryland.
`;

function generateContextualReply(query) {
  const q = (query || '').toLowerCase();

  if (q.includes('ai-cti') || q.includes('flagship') || q.includes('threat intel') || q.includes('secops')) {
    return `🔥 **AI-CTI** is Akeel's flagship full-stack Security Operations suite spanning **14 pages**.\n\n• **Frontend:** React + Tailwind (Deployed on Vercel)\n• **Backend:** Node.js + Express + SQLite (Deployed on Render)\n• **Security:** Real JWT authentication with Role-Based Access Control (RBAC), rate limiting (50 req/min), and account lockout.\n• **Threat Feeds:** Live integrations with VirusTotal, AbuseIPDB, and AlienVault OTX APIs.\n• **DevOps:** 13 automated CI tests executed on push with automated DB backups.\n\nGitHub repo: https://github.com/AKEEL-AHMAD/ai-cti`;
  }

  if (q.includes('sih') || q.includes('gold') || q.includes('hackathon') || q.includes('kharagpur') || q.includes('hardware')) {
    return `🏆 **Smart India Hackathon 2025 National Finalist (IIT Kharagpur)**:\n\nAkeel built a **Non-Destructive Alternative to Traditional Fire Assay for Gold Testing** using ESP32 and Arduino UNO.\n\nInstead of destroying jewelry by melting it (cupellation), his system combines **hydrostatic Archimedes density calculation** with **eddy current electromagnetic response** to evaluate purity with 100% sample integrity.`;
  }

  if (q.includes('skill') || q.includes('tool') || q.includes('python') || q.includes('nmap') || q.includes('linux') || q.includes('tech')) {
    return `🛡️ **Akeel's Core Technical Skills:**\n\n• **Cybersecurity:** Ethical Hacking, Threat Hunting, MITRE ATT&CK Matrix, Reconnaissance & Port Scanning (Nmap), Wireshark Traffic Analysis, Vulnerability Assessment, OWASP Top 10, Applied Cryptography (AES-256 GCM, PBKDF2), JWT & RBAC.\n• **Languages:** Python (Primary), Node.js, Express, React, SQL/SQLite, HTML5/CSS, C/C++.\n• **Hardware & IoT:** ESP32, Arduino UNO, Sensor Array Interfacing (I2C/SPI/UART), Non-Destructive Physical Testing.\n• **DevOps & Cloud:** Automated CI/CD (13+ Tests), Vercel, Render, Git/GitHub.`;
  }

  if (q.includes('cert') || q.includes('deloitte') || q.includes('tata') || q.includes('intel') || q.includes('maryland')) {
    return `📜 **Verified Industry Certifications:**\n\n1. **Cyber Simulation** — Deloitte\n2. **Cybersecurity Analyst** — TATA\n3. **Cybersecurity for Everyone** — University of Maryland\n4. **AI for Entrepreneurship & AI for All** — Intel\n5. **Introduction to Cybersecurity Essentials**\n6. **Ethical Hacking Principles**\n7. **Python Data Structures & Algorithms**`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('anna university')) {
    return `🎓 **Educational Background:**\n\n• **B.Tech / B.E. in Computer Science & Engineering (2024–2027)**\n  Nehru Institute of Engineering and Technology (Anna University) • **CGPA: 7.56**\n• **Diploma in Computer Engineering (2020–2023)**\n  Government Polytechnic College Gogji Bagh Srinagar (BOTE) • **CGPA: 7.0**\n• **10th Matriculation (2018–2019)**\n  Jamia Islamia Waripora Handwara (JKBOSE) • **63%**`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('linkedin')) {
    return `📬 **Get in Touch with Akeel Ahmad Peerzada:**\n\n• **Email:** peerakeel9027@gmail.com\n• **Phone:** +91 6006889027\n• **LinkedIn:** https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/\n• **GitHub:** https://github.com/AKEEL-AHMAD\n• **Location:** Jammu & Kashmir, India (Open to Relocation & Remote roles)`;
  }

  return `👋 I am **Akeel AI**, assistant for **Akeel Ahmad Peerzada**.\n\nAkeel is a Cybersecurity Analyst and B.E. Computer Science Scholar specialized in:\n• **AI-CTI** (14-page Threat Intelligence SecOps suite)\n• **Hardware Security** (SIH 2025 Finalist at IIT Kharagpur with ESP32 & Arduino)\n• **Applied Cryptography** (AES-256 GCM & Zero-Knowledge vaults)\n• **Verified Certifications** (Deloitte, TATA, Intel, Univ of Maryland)\n\nAsk me anything about his projects, skills, certifications, or how to contact him!`;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // AI Chatbot Backend API Endpoint: /api/chat
  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const message = payload.message || '';

        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        if (apiKey && typeof fetch !== 'undefined') {
          try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const contents = [{
              role: 'user',
              parts: [{ text: `${AKEEL_SYSTEM_CONTEXT}\n\nUser Question: ${message}` }]
            }];

            const apiRes = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents })
            });

            const apiData = await apiRes.json();
            const reply = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (reply) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ reply, source: 'gemini-live-api' }));
            }
          } catch (e) {
            console.error('Gemini API call failed, using contextual fallback:', e.message);
          }
        }

        // Contextual Fallback
        const reply = generateContextualReply(message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply, source: 'contextual-secops-engine' }));

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Static File Server
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Akeel Ahmad Peerzada Portfolio & Chatbot Server running on http://localhost:${PORT}`);
});
