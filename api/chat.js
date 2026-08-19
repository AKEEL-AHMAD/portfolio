/**
 * Serverless API Endpoint for Akeel AI Chatbot
 * Formatted in CommonJS (Node.js) for 100% Vercel & Netlify compatibility.
 */

const AKEEL_SYSTEM_CONTEXT = `
You are "Akeel AI", the official intelligent AI portfolio assistant for Akeel Ahmad Peerzada.
Your job is to answer questions from recruiters, hiring managers, engineers, and visitors accurately, professionally, and enthusiastically based on Akeel's real background and verified CV.

=== AKEEL AHMAD PEERZADA - MASTER PROFILE ===
• Name: Akeel Ahmad Peerzada
• Role: Cybersecurity Analyst, Threat Intel Platform Builder, and IoT Hardware Security Developer
• Location: Jammu & Kashmir, India (Open to Relocation & Remote Roles)
• Phone: +91 6006889027
• Email: peerakeel9027@gmail.com
• GitHub: https://github.com/AKEEL-AHMAD (Portfolio repo: https://github.com/AKEEL-AHMAD/portfolio, AI-CTI repo: https://github.com/AKEEL-AHMAD/ai-cti)
• LinkedIn: https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/

=== CAREER OBJECTIVE ===
Builds cybersecurity and IoT systems using Python, Linux, Wireshark, and Nmap to test, automate, and troubleshoot connected devices. Develops ESP32 and Arduino prototypes that connect hardware and software for practical problem solving. Applies ethical hacking and network security fundamentals to create secure, working prototypes.

=== EDUCATION ===
1. B.Tech / B.E. in Computer Science & Engineering (2024 – 2027)
   - College: Nehru Institute of Engineering and Technology (Anna University)
   - CGPA: 7.56
   - Focus: Network Security, Operating Systems (Linux Kernel), DBMS, Applied Cryptography.
2. Diploma in Computer Engineering (2020 – 2023)
   - College: Government Polytechnic College Gogji Bagh Srinagar (BOTE)
   - CGPA: 7.0
3. 10th Matriculation (Dec 2018 – Dec 2019)
   - School: Jamia Islamia Waripora Gonipora Handwara (JKBOSE)
   - Score: 63%

=== FEATURED PROJECTS ===
1. AI-CTI: Full-Stack 14-Page Cyber Threat Intelligence & SecOps Platform
   - Architecture: React + Tailwind frontend (Vercel) | Node.js + Express backend (Render) | SQLite database with auto-backup daemon.
   - Security: Real cryptographic JWT with Role-Based Access Control (RBAC), express rate limiting (50 req/min), account lockout policies.
   - Live Feeds: VirusTotal API, AbuseIPDB IP reputation, AlienVault OTX Threat Pulses.
   - Quality: 13-test automated CI test suite on push, self-signed HTTPS, honest documentation of real vs simulated APIs.
   - GitHub: https://github.com/AKEEL-AHMAD/ai-cti

2. Non-Destructive Alternative to Fire Assay for Gold Testing (SIH 2025 Finalist at IIT Kharagpur)
   - Achievement: Smart India Hackathon 2025 National Finalist (Grand Finale at IIT Kharagpur).
   - Problem Solved: Traditional cupellation/fire assay destroys jewelry. Akeel engineered multi-sensor embedded hardware using ESP32 & Arduino UNO.
   - Method: Hydrostatic density calculation (Archimedes principle) + eddy current electromagnetic conductivity profiling for 100% non-destructive purity testing.

3. AI Smart Community Health Monitoring & Early Warning System (Mini Project)
   - Location: Coimbatore (2024–2025).
   - Scope: Predictive surveillance correlating water quality IoT sensors (pH, turbidity, DO) with symptom logs to forecast water-borne epidemics and dispatch automated early warnings.

4. Zero-Knowledge Cryptographic Password Vault
   - Scope: AES-256 GCM authenticated encryption, PBKDF2-HMAC-SHA512 key derivation with 600,000 rounds, and memory buffer sanitization to prevent memory dumping.

=== CERTIFICATIONS ===
• Cyber Simulation — Deloitte
• Cybersecurity Analyst — TATA
• Cybersecurity for Everyone — University of Maryland
• AI for Entrepreneurship & AI for All — Intel
• Introduction to Cybersecurity Essentials & Ethical Hacking Principles
• Python Data Structures & Algorithms

=== MENTORSHIP & INDUSTRY GUIDES ===
• Project Mentor: Mr. Madan Mohan (Project Mentor & Industry Guide — https://www.linkedin.com/in/madanmohan-reyansh/)
  Guidance provided on cybersecurity threat intelligence architectures, hardware IoT sensor integration, and engineering methodologies.

=== WORK EXPERIENCE & ATHLETICS ===
• CODTECH IT Solutions Pvt. Ltd. (Cyber Security & Ethical Hacking Intern): Reconnaissance, Nmap port scanning, vulnerability assessments, exploit vector verifications, and technical mitigation reporting.
• State-Level Cricket Representative: Competitive athletics developing high-pressure composure, leadership, and discipline.

=== GUIDELINES ===
- Speak directly, helpfully, and professionally.
- Highlight concrete technical specifications (AES-256 GCM, PBKDF2 600k rounds, JWT RBAC, ESP32, 13 automated CI tests) rather than generic fluff.
- If asked about hiring or contacting Akeel, provide his email (peerakeel9027@gmail.com) and phone (+91 6006889027).
`;

function generateContextualReply(query) {
  const q = (query || '').toLowerCase();

  if (q.includes('ai-cti') || q.includes('flagship') || q.includes('threat intel') || q.includes('secops')) {
    return `🔥 **AI-CTI** is Akeel's flagship full-stack Security Operations suite spanning **14 pages**.\n\n• **Frontend:** React + Tailwind (Deployed on Vercel)\n• **Backend:** Node.js + Express + SQLite (Deployed on Render)\n• **Security:** Real JWT authentication with Role-Based Access Control (RBAC), rate limiting (50 req/min), and account lockout.\n• **Threat Feeds:** Live integrations with VirusTotal, AbuseIPDB, and AlienVault OTX APIs.\n• **DevOps:** 13 automated CI tests executed on push with automated DB backups.\n\nGitHub repo: https://github.com/AKEEL-AHMAD/ai-cti`;
  }

  if (q.includes('sih') || q.includes('gold') || q.includes('hackathon') || q.includes('kharagpur') || q.includes('hardware') || q.includes('fire assay')) {
    return `🏆 **Smart India Hackathon 2025 National Finalist (IIT Kharagpur)**:\n\nAkeel built a **Non-Destructive Alternative to Traditional Fire Assay for Gold Testing** using ESP32 and Arduino UNO.\n\nInstead of destroying jewelry by melting it (cupellation), his system combines **hydrostatic Archimedes density validation** with **eddy current electromagnetic response** to evaluate purity with 100% sample integrity.`;
  }

  if (q.includes('skill') || q.includes('tool') || q.includes('python') || q.includes('nmap') || q.includes('linux') || q.includes('tech') || q.includes('wireshark')) {
    return `🛡️ **Akeel's Core Technical Skills:**\n\n• **Cybersecurity:** Ethical Hacking, Threat Hunting, MITRE ATT&CK Matrix, Reconnaissance & Port Scanning (Nmap), Wireshark Traffic Analysis, Vulnerability Assessment, OWASP Top 10, Applied Cryptography (AES-256 GCM, PBKDF2), JWT & RBAC.\n• **Languages:** Python (Primary), Node.js, Express, React, SQL/SQLite, HTML5/CSS, C/C++.\n• **Hardware & IoT:** ESP32, Arduino UNO, Sensor Array Interfacing (I2C/SPI/UART), Non-Destructive Physical Testing.\n• **DevOps & Cloud:** Automated CI/CD (13+ Tests), Vercel, Render, Git/GitHub.`;
  }

  if (q.includes('cert') || q.includes('deloitte') || q.includes('tata') || q.includes('intel') || q.includes('maryland')) {
    return `📜 **Verified Industry Certifications:**\n\n1. **Cyber Simulation** — Deloitte\n2. **Cybersecurity Analyst** — TATA\n3. **Cybersecurity for Everyone** — University of Maryland\n4. **AI for Entrepreneurship & AI for All** — Intel\n5. **Introduction to Cybersecurity Essentials**\n6. **Ethical Hacking Principles**\n7. **Python Data Structures & Algorithms**`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('anna university')) {
    return `🎓 **Educational Background:**\n\n• **B.Tech / B.E. in Computer Science & Engineering (2024–2027)**\n  Nehru Institute of Engineering and Technology (Anna University) • **CGPA: 7.56**\n• **Diploma in Computer Engineering (2020–2023)**\n  Government Polytechnic College Gogji Bagh Srinagar (BOTE) • **CGPA: 7.0**\n• **10th Matriculation (2018–2019)**\n  Jamia Islamia Waripora Handwara (JKBOSE) • **63%**`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('call')) {
    return `📬 **Get in Touch with Akeel Ahmad Peerzada:**\n\n• **Email:** peerakeel9027@gmail.com\n• **Phone:** +91 6006889027\n• **LinkedIn:** https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/\n• **GitHub:** https://github.com/AKEEL-AHMAD\n• **Location:** Jammu & Kashmir, India (Open to Relocation & Remote roles)`;
  }

  if (q.includes('cricket') || q.includes('sports')) {
    return `🏏 **State-Level Cricket Background:**\nAkeel represented state teams in competitive cricket leagues. The rigor of high-stakes sports developed his tactical composure, strategic thinking, and ability to execute under intense pressure.`;
  }

  if (q.includes('internship') || q.includes('codtech') || q.includes('experience')) {
    return `💼 **Cyber Security & Ethical Hacking Intern at CODTECH IT Solutions Pvt. Ltd.:**\nConducted reconnaissance, network scanning with Nmap, vulnerability assessments, exploit vector verifications, and professional security mitigation reporting.`;
  }

  if (q.includes('health') || q.includes('water') || q.includes('mini project')) {
    return `💡 **Smart Community Health Monitoring & Early Warning System (Mini Project):**\nDeveloped in Coimbatore (2024–2025). An integrated surveillance system correlating water telemetry IoT sensors (pH, turbidity, dissolved oxygen) with symptom logs to forecast water-borne epidemics and dispatch automated early quarantine warnings.`;
  }

  if (q.includes('password') || q.includes('vault') || q.includes('crypto')) {
    return `🔒 **Zero-Knowledge Cryptographic Password Vault:**\nA high-security credential vault featuring **AES-256 GCM** authenticated encryption, **PBKDF2-HMAC-SHA512** key derivation with 600,000 iterations, and memory buffer sanitization to prevent memory dumping and offline brute force.`;
  }

  if (q.includes('mentor') || q.includes('madan') || q.includes('mohan') || q.includes('guide') || q.includes('endorse')) {
    return `🤝 **Akeel's Project Mentor & Industry Guide:**\n\n• **Mentor:** **Mr. Madan Mohan**\n• **LinkedIn Profile:** [linkedin.com/in/madanmohan-reyansh](https://www.linkedin.com/in/madanmohan-reyansh/)\n• **Guidance:** Provided technical mentoring and architectural review across cybersecurity threat intelligence, hardware IoT sensor integration, and secure systems design.`;
  }

  return `👋 I am **Akeel AI**, assistant for **Akeel Ahmad Peerzada**.\n\nAkeel is a Cybersecurity Analyst and B.E. Computer Science Scholar specialized in:\n• **AI-CTI** (14-page Threat Intelligence SecOps suite)\n• **Hardware Security** (SIH 2025 Finalist at IIT Kharagpur with ESP32 & Arduino)\n• **Applied Cryptography** (AES-256 GCM & Zero-Knowledge vaults)\n• **Verified Certifications** (Deloitte, TATA, Intel, Univ of Maryland)\n\nAsk me anything about his projects, skills, certifications, or how to contact him!`;
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'Akeel AI SecOps Assistant API',
      version: '1.0.0',
      owner: 'Akeel Ahmad Peerzada'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const message = body.message || '';

    if (!message) {
      return res.status(200).json({
        reply: "Hi! I am Akeel AI. What would you like to know about Akeel's projects, cybersecurity experience, or certifications?",
        source: 'greeting'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey && typeof fetch !== 'undefined') {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const contents = [
          {
            role: 'user',
            parts: [{ text: `${AKEEL_SYSTEM_CONTEXT}\n\nUser Question: ${message}` }]
          }
        ];

        const apiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        });

        const data = await apiRes.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (reply) {
          return res.status(200).json({ reply, source: 'gemini-live-api' });
        }
      } catch (geminiErr) {
        console.error('Gemini API fetch error, falling back to contextual engine:', geminiErr.message);
      }
    }

    // High-fidelity fallback contextual engine
    const reply = generateContextualReply(message);
    return res.status(200).json({ reply, source: 'contextual-secops-engine' });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    const reply = generateContextualReply(req.body?.message || '');
    return res.status(200).json({ reply, source: 'fallback-engine' });
  }
};
