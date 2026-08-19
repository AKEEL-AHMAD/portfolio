/**
 * Akeel Ahmad Peerzada - Portfolio Application Logic
 * Interactive Terminal (AkeelOS), Modal Architecture Viewer, SecOps Playground, Skills Filter, Resume Handler, and Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initTerminal();
  initProjectModals();
  initResumeModal();
  initSecOpsPlayground();
  initSkillsFilter();
  initContactForm();
  initNavigation();
  initCopyUtilities();
  initAIChatbot();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Cyber Threat Intelligence & SecOps',
    'AI-CTI Platform Creator',
    'Ethical Hacking & Pen Testing',
    'Smart India Hackathon 2025 Finalist',
    'Hardware IoT Security (ESP32/Arduino)',
    'Applied Cryptography & Vault Security'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. INTERACTIVE TERMINAL ENGINE (AkeelOS)
   ========================================================================== */
function initTerminal() {
  const terminalForm = document.getElementById('terminalForm');
  const termInput = document.getElementById('termInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const termClearBtn = document.getElementById('termClearBtn');
  const quickTerminalBtn = document.getElementById('quickTerminalBtn');
  const interactiveTerminal = document.getElementById('interactiveTerminal');
  const chipButtons = document.querySelectorAll('.term-chip');

  if (!terminalForm || !termInput || !terminalOutput) return;

  if (quickTerminalBtn && interactiveTerminal) {
    quickTerminalBtn.addEventListener('click', () => {
      interactiveTerminal.scrollIntoView({ behavior: 'smooth' });
      termInput.focus();
      showToast('Terminal activated. Type commands below.');
    });
  }

  const commandHistory = [];
  let historyIndex = -1;

  // Available Commands Dictionary
  const commands = {
    help: () => `
      <div class="output-text">
        <strong>AkeelOS Shell Commands:</strong><br/>
        • <span class="term-cmd-highlight">whoami</span>       : Profile overview & focus areas<br/>
        • <span class="term-cmd-highlight">ai-cti</span>        : Inspect Flagship Cyber Threat Intelligence Platform<br/>
        • <span class="term-cmd-highlight">gold-assay</span>    : Non-destructive IoT gold assay (SIH 2025 Finalist)<br/>
        • <span class="term-cmd-highlight">resume</span>        : View & print formal Curriculum Vitae<br/>
        • <span class="term-cmd-highlight">sih</span>           : Smart India Hackathon 2025 National Finalist journey<br/>
        • <span class="term-cmd-highlight">projects</span>      : List all primary engineering projects<br/>
        • <span class="term-cmd-highlight">skills</span>        : Breakdown of technical proficiencies<br/>
        • <span class="term-cmd-highlight">internship</span>    : CODTECH IT Solutions experience summary<br/>
        • <span class="term-cmd-highlight">cricket</span>       : State-level athletic background & leadership<br/>
        • <span class="term-cmd-highlight">contact</span>       : Direct communication channels & links<br/>
        • <span class="term-cmd-highlight">clear</span>         : Clean the terminal window
      </div>
    `,

    whoami: () => `
      <div class="output-text">
        <strong>Akeel Ahmad Peerzada</strong><br/>
        🎓 <strong>B.E. in Computer Science and Engineering</strong> (Anna University / NIET, CGPA 7.56)<br/>
        🛡️ <strong>Specialization:</strong> Threat Hunting, CTI Platforms, Embedded Hardware Testing, Cryptography<br/>
        🏆 <strong>Milestones:</strong> Smart India Hackathon 2025 Finalist, State-Level Cricketer<br/>
        💡 <em>"A curious, ambitious, hands-on learner focused on building verifiable security solutions."</em>
      </div>
    `,

    'ai-cti': () => `
      <div class="output-text">
        🔥 <strong>AI-CTI (Cyber Threat Intelligence & SecOps Platform)</strong><br/>
        • <strong>Type:</strong> Full-Stack 14-Page Security Operations Suite<br/>
        • <strong>Stack:</strong> React + Tailwind (Frontend) | Node.js + Express + SQLite (Backend)<br/>
        • <strong>Security:</strong> Real JWT with Role-Based Access Control (RBAC), Rate Limiting, Account Lockout<br/>
        • <strong>Integrations:</strong> VirusTotal, AbuseIPDB, and AlienVault OTX Threat Intel APIs<br/>
        • <strong>DevOps:</strong> 13-Test Automated Suite on push, Self-Signed HTTPS, Auto DB Backups<br/>
        • <strong>GitHub Repo:</strong> <a href="https://github.com/AKEEL-AHMAD/ai-cti" target="_blank" style="color:#06b6d4;text-decoration:underline;">https://github.com/AKEEL-AHMAD/ai-cti</a><br/>
        <a href="#flagship" style="color:#10b981;text-decoration:underline;">[Jump to Flagship Section]</a>
      </div>
    `,

    'gold-assay': () => `
      <div class="output-text">
        🏆 <strong>Non-Destructive Alternative to Fire Assay for Gold Testing (SIH 2025 Finalist)</strong><br/>
        • <strong>Problem:</strong> Traditional fire assay destroys or alters precious sample jewellery.<br/>
        • <strong>Hardware:</strong> ESP32 & Arduino UNO microcontroller sensor array.<br/>
        • <strong>Method:</strong> Hydrostatic density calculation + eddy current electromagnetic profiling.<br/>
        • <strong>Result:</strong> 100% non-destructive purity evaluation with digital telemetry logging.<br/>
        <a href="#projects" style="color:#06b6d4;text-decoration:underline;">[View in Projects Grid]</a>
      </div>
    `,

    resume: () => {
      openResumeModal();
      return `
        <div class="output-text" style="color:#10b981;">
          📄 Opened Curriculum Vitae modal. You can review or click 'Print / Save as PDF'.
        </div>
      `;
    },

    sih: () => `
      <div class="output-text">
        🏆 <strong>Smart India Hackathon 2025 — National Finalist</strong><br/>
        • <strong>Project:</strong> Non-Destructive Alternative Method to Traditional Fire Assay for Gold Testing.<br/>
        • <strong>Hardware:</strong> ESP32, Arduino UNO, Hydrostatic load cells, and electromagnetic sensor coils.<br/>
        • <strong>Defense:</strong> Live technical defense and prototype testing before national jury panels.
      </div>
    `,

    projects: () => `
      <div class="output-text">
        📂 <strong>Featured Engineering & Security Projects:</strong><br/>
        1. <strong>AI-CTI</strong> — Flagship 14-Page SecOps & Cyber Threat Intelligence Suite (<a href="https://github.com/AKEEL-AHMAD/ai-cti" target="_blank" style="color:#06b6d4;">GitHub</a>)<br/>
        2. <strong>Gold Fire Assay Alternative</strong> — SIH 2025 Finalist Project (ESP32 / Arduino / Hardware Security)<br/>
        3. <strong>Smart Community Health Monitoring</strong> — Mini Project (AI / Data Pipelines / Web Dashboard)<br/>
        4. <strong>Cryptographic Password Vault</strong> — Zero-Knowledge AES-256 GCM Vault<br/>
        <em>Type project command (e.g. 'ai-cti' or 'gold-assay') for quick deep-dive.</em>
      </div>
    `,

    skills: () => `
      <div class="output-text">
        🛡️ <strong>Cybersecurity:</strong> Threat Hunting, MITRE ATT&CK, Recon, Vulnerability Assessment, OWASP, Linux Hardening, Applied Crypto<br/>
        💻 <strong>Programming:</strong> Python, JavaScript/Node.js, Express, React, SQL/SQLite, C/C++<br/>
        ⚡ <strong>Hardware/IoT:</strong> ESP32, Arduino, Microcontroller Interfacing, Sensor Arrays<br/>
        🧠 <strong>AI & DevOps:</strong> GenAI, Predictive Health Analytics, CI/CD Automated Testing (13+ Tests), Render, Vercel
      </div>
    `,

    internship: () => `
      <div class="output-text">
        💼 <strong>CODTECH IT Solutions</strong> — Cyber Security & Ethical Hacking Intern<br/>
        • Reconnaissance, Network port scanning with Nmap & vulnerability discovery.<br/>
        • Verification of basic exploit vectors & mitigation reporting.<br/>
        • Collaborative security analysis & documentation.
      </div>
    `,

    cricket: () => `
      <div class="output-text">
        🏏 <strong>State-Level Cricket:</strong><br/>
        Represented state team in competitive cricket leagues.<br/>
        Instilled discipline, high-pressure execution, strategic thinking, and team leadership.
      </div>
    `,

    certs: () => `
      <div class="output-text">
        📜 <strong>Verified Industry Certifications:</strong><br/>
        • <strong>Cyber Simulation:</strong> Deloitte<br/>
        • <strong>Cybersecurity Analyst:</strong> TATA<br/>
        • <strong>Cybersecurity for Everyone:</strong> University of Maryland<br/>
        • <strong>AI for Entrepreneurship & AI for All:</strong> Intel<br/>
        • <strong>Introduction to Cybersecurity Essentials</strong><br/>
        • <strong>Ethical Hacking Principles</strong><br/>
        • <strong>Python Data Structures</strong><br/>
        <a href="#certifications" style="color:#06b6d4;text-decoration:underline;">[View Certifications Section]</a>
      </div>
    `,

    certifications: () => `
      <div class="output-text">
        📜 <strong>Verified Industry Certifications:</strong><br/>
        • <strong>Cyber Simulation:</strong> Deloitte<br/>
        • <strong>Cybersecurity Analyst:</strong> TATA<br/>
        • <strong>Cybersecurity for Everyone:</strong> University of Maryland<br/>
        • <strong>AI for Entrepreneurship & AI for All:</strong> Intel<br/>
        • <strong>Introduction to Cybersecurity Essentials</strong><br/>
        • <strong>Ethical Hacking Principles</strong><br/>
        • <strong>Python Data Structures</strong><br/>
        <a href="#certifications" style="color:#06b6d4;text-decoration:underline;">[View Certifications Section]</a>
      </div>
    `,

    contact: () => `
      <div class="output-text">
        📬 <strong>Direct Channels:</strong><br/>
        • <strong>Phone:</strong> <a href="tel:+916006889027" style="color:#34d399;">+91 6006889027</a><br/>
        • <strong>Email:</strong> <a href="mailto:peerakeel9027@gmail.com" style="color:#10b981;">peerakeel9027@gmail.com</a><br/>
        • <strong>GitHub:</strong> <a href="https://github.com/AKEEL-AHMAD?tab=repositories" target="_blank" style="color:#06b6d4;">https://github.com/AKEEL-AHMAD</a><br/>
        • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/" target="_blank" style="color:#38bdf8;">akeel-ahmad-peerzada</a><br/>
        • <strong>Location:</strong> Jammu & Kashmir, India<br/>
        • <a href="#contact" style="color:#10b981;text-decoration:underline;">[Go to Contact Form]</a>
      </div>
    `,

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },

    cls: () => {
      terminalOutput.innerHTML = '';
      return '';
    },

    sudo: () => `
      <div class="output-text" style="color:#ef4444;">
        ⚠️ Permission denied: guest is not in sudoers file. This incident will be reported to Akeel.
      </div>
    `,

    date: () => `
      <div class="output-text">
        🕒 Node Time: ${new Date().toLocaleString()} (UTC+05:30)
      </div>
    `
  };

  // Run Command Handler
  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Save to history
    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Print executed prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'term-line';
    promptLine.innerHTML = `<span class="term-prompt">akeel@cyber-node:~$</span> <span class="term-executed">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(promptLine);

    // Evaluate command
    let responseHtml = '';
    if (commands[cmd]) {
      responseHtml = commands[cmd]();
    } else {
      responseHtml = `
        <div class="output-text" style="color:#ef4444;">
          Command not recognized: <strong>'${escapeHtml(cmd)}'</strong>. Type <span class="term-cmd-highlight">'help'</span> for list of commands.
        </div>
      `;
    }

    if (responseHtml) {
      const responseLine = document.createElement('div');
      responseLine.className = 'term-line';
      responseLine.innerHTML = responseHtml;
      terminalOutput.appendChild(responseLine);
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Form Submit Event
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputVal = termInput.value;
    termInput.value = '';
    executeCommand(inputVal);
  });

  // Clear Button
  termClearBtn.addEventListener('click', () => {
    terminalOutput.innerHTML = `
      <div class="term-line output-system">
        <span class="term-sys-tag">[SYS]</span> Screen buffer cleared. Type <span class="term-cmd-highlight">'help'</span> for commands.
      </div>
    `;
  });

  // Chip Buttons Click
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        termInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });

  // Up/Down History Navigation
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
    }
  });
}

/* ==========================================================================
   3. PROJECT DEEP-DIVE MODAL ENGINE (Rich Technical Architecture)
   ========================================================================== */
function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalKicker = document.getElementById('modalKicker');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSecondaryClose = document.getElementById('modalSecondaryClose');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  if (!modalBackdrop || !modalTitle || !modalBody) return;

  const projectDetails = {
    'ai-cti': {
      kicker: 'FLAGSHIP CYBER THREAT INTELLIGENCE PLATFORM',
      title: 'AI-CTI: Full-Stack 14-Page SecOps & Threat Intel Suite',
      content: `
        <h4>1. System Architecture & Live Ingestion Pipelines</h4>
        <p>
          <strong>AI-CTI</strong> is an end-to-end Cyber Threat Intelligence and Security Operations dashboard. Across <strong>14 dedicated pages</strong>, it bridges tactical SOC monitoring with automated threat hunting, MITRE ATT&CK correlation, and incident containment playbooks.
        </p>
        
        <div class="modal-code-box">
[React / Tailwind Frontend (Hosted on Vercel)] 
    │ (Self-Signed HTTPS / JWT Auth Bearer / Rate-Limited 50 req/min)
    ▼
[Node.js + Express REST API (Hosted on Render)] ──► [SQLite DB + Auto-Backup Service]
    │
    ├──► [VirusTotal API v3 Engine] ────► File Hashes & Multi-Engine Detections
    ├──► [AbuseIPDB Threat Feed] ───────► IP Reputation & C2 Blacklist Scores
    └──► [AlienVault OTX Pulse Graph] ──► Threat Actor Campaigns & MITRE TTPs
        </div>

        <p>
          <strong>GitHub Repository:</strong> <a href="https://github.com/AKEEL-AHMAD/ai-cti" target="_blank" rel="noopener noreferrer" style="color:#06b6d4;text-decoration:underline;">https://github.com/AKEEL-AHMAD/ai-cti</a>
        </p>

        <h4>2. Core Functional Modules (14-Page Suite)</h4>
        <ul>
          <li><strong>IOC Ingestion & Correlation:</strong> Unified query engine for IP addresses, hostnames, MD5/SHA256 file hashes, and CVE identifiers with aggregated risk scoring.</li>
          <li><strong>Threat Hunting & MITRE ATT&CK Matrix:</strong> Interactive visual matrix mapping adversary tactics (Initial Access, Execution, Persistence, Privilege Escalation) to specific technique IDs (T1059, T1078, etc.).</li>
          <li><strong>Incident Management & Forensic Triage:</strong> Ticket creation, CVSS/EPSS scoring, analyst assignment, forensic logs, and containment notes.</li>
          <li><strong>SOAR Playbooks:</strong> Automated containment triggers including IP blacklisting, host quarantine, and credential revocation.</li>
          <li><strong>Malware Telemetry & Analysis:</strong> Static binary inspection with multi-engine signature correlation.</li>
        </ul>

        <h4>3. Security Engineering & Hardening</h4>
        <ul>
          <li><strong>Authentication & RBAC:</strong> Cryptographic JWTs signed with secret keys, implementing granular Role-Based Access Control (Admin, Analyst, Read-Only).</li>
          <li><strong>Brute-Force & DoS Mitigation:</strong> Express rate-limiting (50 requests/min) combined with progressive account lockout policies on failed attempts.</li>
          <li><strong>DevOps & Integrity:</strong> 13 automated tests run via CI pipeline on every push; automated periodic SQLite database backup daemon.</li>
          <li><strong>Honest Documentation:</strong> Transparent architecture documentation clearly designating real live API calls vs simulated benchmark feeds for complete audit integrity.</li>
        </ul>
      `
    },

    'gold-assay': {
      kicker: '🏆 SMART INDIA HACKATHON 2025 FINALIST PROJECT',
      title: 'Non-Destructive Alternative to Fire Assay for Gold Testing',
      content: `
        <h4>1. Engineering Challenge & SIH 2025 Finalist Recognition</h4>
        <p>
          Classical fire assay (cupellation) is the standard for gold testing, but it requires scraping or melting the sample, causing permanent physical destruction. At <strong>Smart India Hackathon 2025</strong>, developed a hardware testing apparatus providing 100% non-destructive purity evaluation.
        </p>

        <h4>2. Hardware Architecture & Sensor Fusion</h4>
        <p>
          Engineered a multi-sensor embedded testing apparatus using <strong>ESP32</strong> and <strong>Arduino UNO</strong>.
        </p>
        <div class="modal-code-box">
[Precious Sample] ──► [High-Precision Hydrostatic Load Sensor] ──► Specific Gravity (Density)
                  ──► [Eddy Current / EM Coil Array]          ──► Conductivity Signature
                  ──► [Microcontroller Sensor Interfacing (ESP32/Arduino)]
                  ──► [Digital LCD Telemetry & Serial Logging Output]
        </div>

        <h4>3. Technical Outcomes & Counterfeit Detection</h4>
        <ul>
          <li><strong>Zero Material Alteration:</strong> Samples remain 100% intact with zero chemical, thermal, or structural change.</li>
          <li><strong>High-Speed Digital Readout:</strong> Purity calculations and karatage estimation computed within seconds.</li>
          <li><strong>Sensor Fusion:</strong> Combined hydrostatic Archimedes density calculation with electromagnetic conductivity profiling to identify counterfeit cores (such as tungsten or lead).</li>
        </ul>
      `
    },

    'sih-health': {
      kicker: '💡 MINI PROJECT | AI & FULL-STACK SYSTEM',
      title: 'AI-Based Smart Community Health Monitoring & Early Warning System',
      content: `
        <h4>1. Project Scope & Architecture</h4>
        <p>
          Developed an end-to-end predictive surveillance system designed to detect and curb water-borne disease outbreaks before they escalate into community epidemics.
        </p>

        <h4>2. System Architecture</h4>
        <div class="modal-code-box">
[Water Sensor Telemetry (IoT)] ──► [Central Data Pipeline] ──► [ML Epidemic Predictor]
[Community Symptom Logs]       ──► [Relational SQL DB]     ──► [Early Warning Dashboard]
                                                            ──► [SMS / Alert Triggers]
        </div>

        <h4>3. Key Technical Modules</h4>
        <ul>
          <li><strong>AI Model Integration:</strong> Connected epidemiological risk algorithms with water quality sensor metrics (pH, turbidity, dissolved oxygen).</li>
          <li><strong>Database & Backend Design:</strong> Designed normalized SQL schemas for symptom reporting, sensor telemetry logs, and automated alert dispatch queues.</li>
          <li><strong>Full-Stack Dashboard:</strong> Built responsive web views for health officers to track risk heatmaps and issue early quarantine warnings.</li>
        </ul>
      `
    },

    passman: {
      kicker: 'APPLIED CRYPTOGRAPHY & SECURE CODING',
      title: 'Zero-Knowledge Cryptographic Password Vault',
      content: `
        <h4>1. Security Philosophy</h4>
        <p>
          Most credential leaks happen via memory snooping or weak key derivation. This project enforces zero-knowledge architecture: the master key never touches disk unencrypted, and secrets are sanitized from memory immediately after use.
        </p>

        <h4>2. Cryptographic Implementation</h4>
        <div class="modal-code-box">
Master Password ──► PBKDF2-HMAC-SHA512 (600,000 Rounds + 32-byte Salt) ──► AES-256 Key
Secret Payload  ──► AES-256 GCM Authenticated Encryption (12-byte IV)   ──► Ciphertext + Tag
        </div>

        <h4>3. Hardening Features</h4>
        <ul>
          <li><strong>Authenticated Encryption (AES-GCM):</strong> Protects both confidentiality and data integrity against ciphertext tampering.</li>
          <li><strong>Anti-Memory Scraping:</strong> Overwrites byte buffers with zeros immediately following encryption/decryption routines.</li>
          <li><strong>Strict Authorization:</strong> Time-based session expiration and automatic vault locking upon inactivity.</li>
        </ul>
      `
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proj = btn.getAttribute('data-project');
      if (proj) openModal(proj);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalSecondaryClose.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. RESUME VIEWER & PRINT MODAL (Rock-Solid Multi-Trigger System)
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  window.openResumeModal = function() {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showToast('Viewing Curriculum Vitae. Click "Print" to save as PDF.');
  };

  window.closeResumeModal = function() {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Global event delegation for all resume buttons
  document.addEventListener('click', (e) => {
    const resumeBtn = e.target.closest('#navResumeBtn, #heroResumeBtn, .nav-resume-btn, .btn-resume-cta, [data-action="resume"]');
    if (resumeBtn) {
      e.preventDefault();
      e.stopPropagation();
      openResumeModal();
    }
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });
}

/* ==========================================================================
   5. INTERACTIVE SECOPS PLAYGROUND (Proof Over Description)
   ========================================================================== */
function initSecOpsPlayground() {
  const queryChips = document.querySelectorAll('.soc-query-chip');
  const feedItems = document.querySelectorAll('#socFeedList .feed-item');
  const feedback = document.getElementById('socQueryFeedback');

  if (!feedback) return;

  const mockIntelDb = {
    '185.220.101.5': {
      status: 'CRITICAL',
      score: '100% Malicious',
      source: 'AbuseIPDB / Tor Exit Node',
      desc: 'Active Cobalt Strike C2 Infrastructure reported by 142 distinct security analysts.'
    },
    'CVE-2024-3094': {
      status: 'CRITICAL',
      score: 'CVSS 10.0',
      source: 'NVD / AlienVault Pulse',
      desc: 'Malicious backdoor in upstream XZ Utils liblzma targeting OpenSSH authentication.'
    },
    '8.8.8.8': {
      status: 'CLEAN',
      score: '0/72 Detections',
      source: 'VirusTotal / Quad8',
      desc: 'Verified benign Google Anycast Public DNS Resolver.'
    },
    'SHA256': {
      status: 'WARNING',
      score: '48/72 Detections',
      source: 'VirusTotal Static Engine',
      desc: 'Trojan.AgentTesla spyware binary with persistence mechanism in AppData.'
    }
  };

  function handleQuery(key) {
    const data = mockIntelDb[key] || mockIntelDb['185.220.101.5'];
    feedback.innerHTML = `<span>Querying...</span>`;

    setTimeout(() => {
      if (data.status === 'CRITICAL') {
        feedback.innerHTML = `<span style="color:#f87171;">⚠️ [${data.score}] ${data.source}: ${data.desc}</span>`;
      } else if (data.status === 'CLEAN') {
        feedback.innerHTML = `<span style="color:#34d399;">✓ [${data.score}] ${data.source}: ${data.desc}</span>`;
      } else {
        feedback.innerHTML = `<span style="color:#fbbf24;">⚡ [${data.score}] ${data.source}: ${data.desc}</span>`;
      }
    }, 250);
  }

  queryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      handleQuery(q);
    });
  });

  feedItems.forEach((item) => {
    item.addEventListener('click', () => {
      const ioc = item.getAttribute('data-ioc');
      handleQuery(ioc);
    });
  });
}

/* ==========================================================================
   6. SKILLS FILTER TABS
   ========================================================================== */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const category = tab.getAttribute('data-tab');

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM (Formspree AJAX + Mailto Fallback)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const sendMessageBtn = document.getElementById('sendMessageBtn');

  if (!contactForm || !formStatus) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('messageSubject').value;
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      formStatus.className = 'form-status error';
      formStatus.textContent = '❌ Please fill out all required fields.';
      return;
    }

    sendMessageBtn.disabled = true;
    sendMessageBtn.innerHTML = `<span>Encrypting & Dispatching...</span> <span class="spinner">⏳</span>`;
    formStatus.className = 'form-status';
    formStatus.textContent = '🔒 Establishing secure transmission channel...';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `✓ <strong>Message dispatched successfully!</strong> Thank you, ${escapeHtml(name)}. I will respond to <strong>${escapeHtml(email)}</strong> shortly.`;
        contactForm.reset();
        showToast('Message dispatched to Akeel Ahmad Peerzada!');
      } else {
        // Graceful Mailto fallback
        triggerMailtoFallback(name, email, subject, message);
      }
    } catch (err) {
      // Graceful Mailto fallback on network offline
      triggerMailtoFallback(name, email, subject, message);
    } finally {
      sendMessageBtn.disabled = false;
      sendMessageBtn.innerHTML = `<span>Dispatch Message Securely</span> <span class="icon">🚀</span>`;
    }
  });

  function triggerMailtoFallback(name, email, subject, message) {
    formStatus.className = 'form-status success';
    formStatus.innerHTML = `✓ Direct channel prepared. Opening mail client for <strong>peerakeel9027@gmail.com</strong>...`;
    const mailtoUri = `mailto:peerakeel9027@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
    window.location.href = mailtoUri;
    showToast('Redirecting to mail client...');
  }
}

/* ==========================================================================
   8. NAVIGATION & SMOOTH SCROLLING
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navAnchorLinks = document.querySelectorAll('a.nav-link');
  const sections = document.querySelectorAll('section');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navAnchorLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. COPY TO CLIPBOARD & TOAST UTILITIES
   ========================================================================== */
function initCopyUtilities() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'peerakeel9027@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email address copied to clipboard (peerakeel9027@gmail.com)!');
      }).catch(() => {
        showToast('Email: peerakeel9027@gmail.com');
      });
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🛡️</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================================================
   10. AKEEL AI CHATBOT ENGINE (API Integration + Local Contextual Engine)
   ========================================================================== */
function initAIChatbot() {
  const toggleBtn = document.getElementById('aiChatToggleBtn');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiCloseChatBtn');
  const clearBtn = document.getElementById('aiClearChatBtn');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');
  const chatBody = document.getElementById('aiChatBody');
  const chips = document.querySelectorAll('.ai-chip');

  if (!toggleBtn || !chatWindow || !chatForm || !chatInput || !chatBody) return;

  function toggleChat() {
    const isOpen = chatWindow.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    chatWindow.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      setTimeout(() => chatInput.focus(), 150);
    }
  }

  function closeChat() {
    chatWindow.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatBody.innerHTML = `
        <div class="chat-msg bot-msg">
          <div class="msg-avatar">🤖</div>
          <div class="msg-bubble">
            Chat cleared. How else can I help you regarding Akeel's projects, skills, or experience?
          </div>
        </div>
      `;
    });
  }

  // Quick Chips
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      if (question) {
        chatInput.value = question;
        handleSendMessage(question);
      }
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    handleSendMessage(query);
  });

  async function handleSendMessage(message) {
    chatInput.value = '';

    // Append User Message
    appendMessage(message, 'user');

    // Show Typing Indicator
    const typingElem = showTypingIndicator();

    try {
      // 1. Try sending to Backend API (/api/chat)
      let replyText = '';
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.reply) {
            replyText = data.reply;
          }
        }
      } catch (netErr) {
        // Static deploy fallback
      }

      // 2. If API not available (e.g. static hosting on Netlify/GitHub/Surge), use Instant Intelligent Engine
      if (!replyText) {
        await new Promise((res) => setTimeout(res, 500)); // Natural response delay
        replyText = getLocalContextualReply(message);
      }

      // Remove typing indicator & Append Bot Reply
      typingElem.remove();
      appendMessage(replyText, 'bot');

    } catch (err) {
      typingElem.remove();
      appendMessage("I am currently operating in offline mode. Please feel free to reach out directly to Akeel at peerakeel9027@gmail.com or +91 6006889027.", 'bot');
    }
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    const formattedHtml = formatChatMarkdown(text);

    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">${formattedHtml}</div>
    `;

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot-msg';
    typingDiv.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingDiv;
  }

  function formatChatMarkdown(txt) {
    let out = escapeHtml(txt);
    // Bold: **text**
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet points: • or \n•
    out = out.replace(/\n• /g, '<br/>• ');
    out = out.replace(/\n\n/g, '<br/><br/>');
    out = out.replace(/\n/g, '<br/>');
    // Markdown links: [text](url)
    out = out.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Direct URLs
    out = out.replace(/(https?:\/\/[^\s<]+)/g, (match) => {
      if (out.includes(`href="${match}"`)) return match;
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    return out;
  }

  function getLocalContextualReply(query) {
    const q = query.toLowerCase();

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
      return `📬 **Get in Touch with Akeel Ahmad Peerzada:**\n\n• **Email:** [peerakeel9027@gmail.com](mailto:peerakeel9027@gmail.com)\n• **Phone:** [+91 6006889027](tel:+916006889027)\n• **LinkedIn:** [linkedin.com/in/akeel-ahmad-peerzada-59a942333](https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/)\n• **GitHub:** [github.com/AKEEL-AHMAD](https://github.com/AKEEL-AHMAD)\n• **Location:** Jammu & Kashmir, India (Open to Relocation & Remote roles)`;
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

    return `👋 I am **Akeel AI**, assistant for **Akeel Ahmad Peerzada**.\n\nAkeel is a Cybersecurity Analyst and B.E. Computer Science Scholar specialized in:\n• **AI-CTI** (14-page Threat Intelligence SecOps suite)\n• **Hardware Security** (SIH 2025 Finalist at IIT Kharagpur with ESP32 & Arduino)\n• **Applied Cryptography** (AES-256 GCM & Zero-Knowledge vaults)\n• **Verified Certifications** (Deloitte, TATA, Intel, Univ of Maryland)\n\nAsk me anything about his projects, skills, certifications, or how to contact him!`;
  }
}

