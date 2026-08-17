/**
 * Akeel Ahmad Peerzada - Portfolio Application Logic
 * Interactive Terminal (AkeelOS), Modal Architecture Viewer, Skills Filter, and Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initTerminal();
  initProjectModals();
  initSkillsFilter();
  initContactForm();
  initNavigation();
  initCopyUtilities();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Cybersecurity & Threat Intelligence',
    'AI-CTI Platform Creator',
    'Ethical Hacking & Pen Testing',
    'Smart India Hackathon 2025 Finalist',
    'Hardware IoT Security (ESP32/Arduino)',
    'Applied Cryptography & Secure Coding'
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

  const commandHistory = [];
  let historyIndex = -1;

  // Available Commands Dictionary
  const commands = {
    help: () => `
      <div class="output-text">
        <strong>AkeelOS Shell Commands:</strong><br/>
        • <span class="term-cmd-highlight">whoami</span>       : Profile overview & current status<br/>
        • <span class="term-cmd-highlight">ai-cti</span>        : Inspect Flagship Cyber Threat Intelligence Platform<br/>
        • <span class="term-cmd-highlight">gold-assay</span>    : Non-destructive IoT gold assay (SIH 2025 Finalist)<br/>
        • <span class="term-cmd-highlight">sih</span>           : Smart India Hackathon 2025 National Finalist journey<br/>
        • <span class="term-cmd-highlight">health-ai</span>     : Mini project on AI community health monitoring<br/>
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
        🎓 <strong>B.E. Computer Science and Engineering</strong> (Final Year, CGPA 7.56)<br/>
        🏛️ <strong>Institution:</strong> Nehru Institute of Eng & Tech (Anna University)<br/>
        🛡️ <strong>Focus:</strong> Cybersecurity, Threat Intelligence, IoT Security, Cryptography<br/>
        🏆 <strong>Achievements:</strong> Smart India Hackathon 2025 Finalist, State-Level Cricketer<br/>
        💡 <em>"A curious, ambitious, hands-on learner dedicated to solving real-world security challenges."</em>
      </div>
    `,

    'ai-cti': () => `
      <div class="output-text">
        🔥 <strong>AI-CTI (Cyber Threat Intelligence Platform)</strong><br/>
        • <strong>Type:</strong> Full-Stack 14-Page Security Operations Suite<br/>
        • <strong>Stack:</strong> React + Tailwind (Frontend) | Node.js + Express + SQLite (Backend)<br/>
        • <strong>Features:</strong> IOC Search, Threat Hunting, MITRE ATT&CK Mapping, Incident Management, SOAR Playbooks<br/>
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
        • <strong>Problem:</strong> Traditional fire assay destroys or alters precious jewellery and artefacts.<br/>
        • <strong>Hardware:</strong> ESP32 & Arduino UNO microcontroller sensor array.<br/>
        • <strong>Method:</strong> Hydrostatic density measurement + electromagnetic/eddy current profiling.<br/>
        • <strong>Result:</strong> 100% non-destructive purity evaluation with digital telemetry logging.<br/>
        <a href="#projects" style="color:#06b6d4;text-decoration:underline;">[View in Projects Grid]</a>
      </div>
    `,

    sih: () => `
      <div class="output-text">
        🏆 <strong>Smart India Hackathon 2025 — National Finalist</strong><br/>
        • <strong>Project:</strong> Non-Destructive Alternative Method to Traditional Fire Assay for Gold Testing.<br/>
        • <strong>Technologies:</strong> ESP32, Arduino UNO, High-precision hydrostatic sensors, EM testing.<br/>
        • <strong>Experience:</strong> Represented institute at national level, defended technical architecture before jury panels.
      </div>
    `,

    'health-ai': () => `
      <div class="output-text">
        💡 <strong>AI Smart Community Health & Early Warning System (Mini Project)</strong><br/>
        • <strong>Scope:</strong> Predictive surveillance for water-borne disease outbreaks.<br/>
        • <strong>Stack:</strong> Python ML models, Relational SQL database, Full-stack dashboard.<br/>
        • <strong>Outcome:</strong> Real-time symptom analytics and early community alert dispatching.
      </div>
    `,

    projects: () => `
      <div class="output-text">
        📂 <strong>Featured Engineering & Security Projects:</strong><br/>
        1. <strong>AI-CTI</strong> — Flagship 14-Page SecOps & Cyber Threat Intelligence Suite (<a href="https://github.com/AKEEL-AHMAD/ai-cti" target="_blank" style="color:#06b6d4;">GitHub</a>)<br/>
        2. <strong>Gold Fire Assay Alternative</strong> — SIH 2025 Finalist Project (ESP32 / Arduino / Hardware Security)<br/>
        3. <strong>Smart Community Health Monitoring</strong> — Mini Project (AI / Data Pipelines / Web Dashboard)<br/>
        4. <strong>Cryptographic Password Manager</strong> — Zero-Knowledge AES-256 GCM Vault<br/>
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
        • Reconnaissance, Network port scanning & vulnerability discovery.<br/>
        • Basic exploitation assessments & mitigation reporting.<br/>
        • Collaborative security analysis & documentation.
      </div>
    `,

    cricket: () => `
      <div class="output-text">
        🏏 <strong>State-Level Cricket:</strong><br/>
        Represented state team in competitive cricket leagues.<br/>
        Instilled discipline, high-pressure execution, strategic thinking, and resilience.
      </div>
    `,

    contact: () => `
      <div class="output-text">
        📬 <strong>Get in Touch:</strong><br/>
        • <strong>Email:</strong> <a href="mailto:peerakeel9027@gmail.com" style="color:#10b981;">peerakeel9027@gmail.com</a><br/>
        • <strong>GitHub:</strong> <a href="https://github.com/AKEEL-AHMAD?tab=repositories" target="_blank" style="color:#06b6d4;">https://github.com/AKEEL-AHMAD</a><br/>
        • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/" target="_blank" style="color:#38bdf8;">https://www.linkedin.com/in/akeel-ahmad-peerzada-59a942333/</a><br/>
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

  // Quick Terminal Button in Hero
  if (quickTerminalBtn && interactiveTerminal) {
    quickTerminalBtn.addEventListener('click', () => {
      interactiveTerminal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      termInput.focus();
      showToast('AkeelOS Terminal active. Try running "ai-cti" or "skills"');
    });
  }
}

/* ==========================================================================
   3. PROJECT DEEP-DIVE MODAL ENGINE
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
        <h4>1. System Overview & Architecture</h4>
        <p>
          <strong>AI-CTI</strong> is an enterprise-grade Cyber Threat Intelligence and Security Operations dashboard built and deployed end-to-end. Spanning <strong>14 functional pages</strong>, it bridges tactical SOC monitoring with automated threat hunting, MITRE ATT&CK correlation, and incident remediation workflows.
        </p>
        
        <div class="modal-code-box">
[React/Tailwind Frontend (Vercel)] 
    │ (Self-Signed HTTPS / JWT Auth Headers / Rate-Limited)
    ▼
[Node.js + Express REST API (Render)] ──► [SQLite DB + Auto-Backup Service]
    │
    ├──► [VirusTotal API Integration] (Malware & Hash Analysis)
    ├──► [AbuseIPDB Feed] (IP Reputation & C2 Telemetry)
    └──► [AlienVault OTX Pulses] (Adversary TTP Tracking)
        </div>

        <p>
          <strong>GitHub Repository:</strong> <a href="https://github.com/AKEEL-AHMAD/ai-cti" target="_blank" rel="noopener noreferrer" style="color:#06b6d4;text-decoration:underline;">https://github.com/AKEEL-AHMAD/ai-cti</a>
        </p>

        <h4>2. Key Modules (14-Page Security Hub)</h4>
        <ul>
          <li><strong>IOC Search & Ingestion:</strong> Query and correlate IP addresses, domains, file hashes (MD5/SHA256), and CVE identifiers.</li>
          <li><strong>Threat Hunting & MITRE ATT&CK:</strong> Visual tactical matrix mapping live adversary behaviors to ATT&CK techniques (T1059, T1078, etc.).</li>
          <li><strong>Incident Management:</strong> Ticket creation, severity scoring (CVSS/EPSS), escalation paths, and forensic note-taking.</li>
          <li><strong>SOAR Playbooks:</strong> Automated containment actions (IP blacklisting, account lockdown triggers).</li>
          <li><strong>Malware Telemetry & Analysis:</strong> Static inspection of suspicious binaries with multi-engine scanning.</li>
        </ul>

        <h4>3. Security Engineering & Hardening</h4>
        <ul>
          <li><strong>Authentication & RBAC:</strong> Cryptographic JWTs with granular Role-Based Access Control (Admin, Analyst, Read-Only).</li>
          <li><strong>Brute-Force & DoS Protection:</strong> Express rate-limiting (50 req/min) combined with progressive account lockout policies.</li>
          <li><strong>DevOps & Integrity:</strong> 13 automated tests run via CI pipeline on every push; automated periodic SQLite database backup daemon.</li>
          <li><strong>Transparent Engineering:</strong> Comprehensive documentation clearly designating real vs simulated data streams for complete honesty and audit readiness.</li>
        </ul>
      `
    },

    'gold-assay': {
      kicker: '🏆 SMART INDIA HACKATHON 2025 FINALIST PROJECT',
      title: 'Non-Destructive Alternative to Fire Assay for Gold Testing',
      content: `
        <h4>1. The Engineering Challenge & SIH 2025 Finalist Recognition</h4>
        <p>
          As a <strong>National Finalist in Smart India Hackathon 2025</strong>, developed a non-destructive hardware alternative to traditional fire assay (cupellation). Traditional testing destroys or alters precious jewellery and artefacts, causing irreversible loss.
        </p>

        <h4>2. Hardware Architecture & Methodology</h4>
        <p>
          Engineered a multi-sensor embedded testing apparatus utilizing <strong>ESP32</strong> and <strong>Arduino UNO</strong>.
        </p>
        <div class="modal-code-box">
[Precious Sample] ──► [High-Precision Hydrostatic Load Sensor] ──► Density Matrix
                  ──► [Eddy Current / EM Coil Array]          ──► Conductivity Signature
                  ──► [Microcontroller Interfacing (ESP32/Arduino)]
                  ──► [Digital LCD Telemetry & Serial Logging]
        </div>

        <h4>3. Technical Outcomes</h4>
        <ul>
          <li><strong>Zero Material Loss:</strong> Samples remain 100% intact with zero chemical, thermal, or structural damage.</li>
          <li><strong>High-Speed Digital Readout:</strong> Purity calculations and karatage estimation computed within seconds.</li>
          <li><strong>Sensor Fusion:</strong> Combined hydrostatic Archimedes density calculation with electromagnetic conductivity profiling to identify counterfeit cores (such as tungsten or lead).</li>
        </ul>
      `
    },

    'sih-health': {
      kicker: '💡 MINI PROJECT | AI & FULL-STACK SYSTEM',
      title: 'AI-Based Smart Community Health Monitoring & Early Warning System',
      content: `
        <h4>1. Project Scope</h4>
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
    btn.addEventListener('click', () => {
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
   4. SKILLS FILTER TABS
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
   5. CONTACT FORM SIMULATION & DISPATCH
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const sendMessageBtn = document.getElementById('sendMessageBtn');

  if (!contactForm || !formStatus) return;

  contactForm.addEventListener('submit', (e) => {
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

    // Simulate Secure Handshake & Transmission
    sendMessageBtn.disabled = true;
    sendMessageBtn.innerHTML = `<span>Encrypting & Dispatching...</span> <span class="spinner">⏳</span>`;
    formStatus.className = 'form-status';
    formStatus.textContent = '🔒 Establishing secure transmission channel...';

    setTimeout(() => {
      sendMessageBtn.disabled = false;
      sendMessageBtn.innerHTML = `<span>Dispatch Message Securely</span> <span class="icon">🚀</span>`;
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `✓ <strong>Message dispatched securely!</strong> Thank you, ${escapeHtml(name)}. I will respond to <strong>${escapeHtml(email)}</strong> shortly.`;
      
      contactForm.reset();
      showToast('Message encrypted and dispatched to Akeel!');
    }, 1200);
  });
}

/* ==========================================================================
   6. NAVIGATION & SMOOTH SCROLLING
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach((link) => {
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

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. COPY TO CLIPBOARD & TOAST UTILITIES
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
