/**
 * CYBER_OPS // AUDIO SYNTHESIZER & HUD LOGIC
 * Recreates the iconic 2000s sci-fi tactical UI soundscape (clean metallic harmonic chime
 * and click confirmation sounds synthesized via Web Audio API - zero external audio files needed).
 */

class TacticalSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Futuristic military UI hover blip (crisp high-frequency tick)
  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Audio fallback gracefully
    }
  }

  // The Iconic 2000s Sci-Fi Military Menu Click / Confirm
  // Dual chime + metallic resonating filter envelope
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Primary tone (bright resonant ping)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(940, now);
      osc1.frequency.exponentialRampToValueAtTime(1420, now + 0.08);
      osc1.frequency.exponentialRampToValueAtTime(710, now + 0.22);

      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      // Secondary metallic overtone (gives that authentic sci-fi shield/HUD menu vibe)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1880, now);
      osc2.frequency.exponentialRampToValueAtTime(2840, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(1420, now + 0.18);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      // Low punch click
      const oscSub = this.ctx.createOscillator();
      const gainSub = this.ctx.createGain();
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(220, now);
      oscSub.frequency.exponentialRampToValueAtTime(60, now + 0.07);
      gainSub.gain.setValueAtTime(0.15, now);
      gainSub.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc1.connect(gain1);
      osc2.connect(gain2);
      oscSub.connect(gainSub);

      gain1.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);
      gainSub.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      oscSub.start(now);

      osc1.stop(now + 0.22);
      osc2.stop(now + 0.18);
      oscSub.stop(now + 0.07);
    } catch (e) {
      // Audio fallback gracefully
    }
  }

  // Cancel / Close Backtrack tone
  playClose() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.14);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {
      // Audio fallback
    }
  }
}

// MEMBER DATA DEFINITION
const TEAM_MEMBERS = {
  maria: {
    callsign: "UNIT // 01",
    name: "Maria Paula",
    role: "Blue Team Lead & AppSec Specialist",
    githubUser: "mariapaula",
    githubUrl: "https://github.com/mariapaula",
    status: "ARMED // ACTIVE",
    bio: "Líder de escuadrón táctico con enfoque en ciberseguridad defensiva, hardening de infraestructura crítica y auditoría de código estático (SAST/DAST). Encargada de mitigar vectores de explotación en tiempo real durante el hackathon y blindar microservicios contra zero-days.",
    skills: ["Cloud Hardening (AWS/GCP)", "AppSec DevSecOps", "Zero Trust Architecture", "SIEM & SOC Detection", "API Security Testing", "Docker Isolation"],
    projects: [
      {
        title: "KUBE-SHIELD // CONTENEDORES INMUNES",
        tag: "DEVSECOPS",
        desc: "Framework para detección y cuarentena automática de microservicios con anomalías de comportamiento en clústeres Kubernetes."
      },
      {
        title: "API-SENTINEL ENGINE",
        tag: "DEFENSIVE",
        desc: "Módulo WAF inteligente capaz de identificar payloads maliciosos OWASP Top 10 con fingerprinting heurístico de baja latencia."
      }
    ],
    svgColor: "#00ffaa",
    svgGradId: "mp-grad"
  },
  gonzalo: {
    callsign: "UNIT // 02",
    name: "Gonzalo",
    role: "Red Team & Exploit Dev",
    githubUser: "gonzalo",
    githubUrl: "https://github.com/gonzalo",
    status: "WEAPONIZED",
    bio: "Operador de penetración e investigación de vulnerabilidades. Especializado en análisis de binarios, evasión de EDRs modernos, desbordamientos de buffer y explotación de fallas de lógica en protocolos de red y componentes IoT.",
    skills: ["Binary Exploitation (PWN)", "GDB / Ghidra / IDA Pro", "EDR / AV Evasion", "Offensive Python & C", "Post-Exploitation Tactics", "Active Directory Attacks"],
    projects: [
      {
        title: "VOID-WALKER EDR BYPASS",
        tag: "OFFENSIVE",
        desc: "Inyector de memoria y hook bypass que evade soluciones comerciales EDR usando syscalls directas y técnicas de unhooking dinámico."
      },
      {
        title: "BUFFER-SURGE CTF TOOLKIT",
        tag: "PWN / EXPLOIT",
        desc: "Suite automatizada de cálculo de gadgets ROP (Return Oriented Programming) para arquitecturas x86_64 y ARM."
      }
    ],
    svgColor: "#39ff14",
    svgGradId: "gz-grad"
  },
  juan: {
    callsign: "UNIT // 03",
    name: "Juan Esteban",
    role: "DFIR & Threat Intelligence Specialist",
    githubUser: "juanesteban",
    githubUrl: "https://github.com/juanesteban",
    status: "SCANNING NET",
    bio: "Especialista en Análisis Forense Digital y Respuesta a Incidentes (DFIR). Rastreador de tácticas de actores de amenazas (TTPs de MITRE ATT&CK), extracción de artefactos en memoria volátil y caza proactiva de ciberamenazas en redes hostiles.",
    skills: ["Volatility Memory Analysis", "Malware Sandboxing", "Wireshark Deep Packet Inspect", "YARA Rules & Sigma", "Threat Intelligence TTPs", "Timeline Reconstruction"],
    projects: [
      {
        title: "CHRONO-FORENSIC EXTRACTOR",
        tag: "DFIR",
        desc: "Herramienta forense para reconstrucción automática de líneas de tiempo de intrusión correlacionando logs EVTX, MFT y dumps RAM."
      },
      {
        title: "YARA-RADAR HUNTER",
        tag: "THREAT INTEL",
        desc: "Motor distribuido de caza de muestras de malware en endpoints en vivo mediante reglas Sigma y YARA customizadas."
      }
    ],
    svgColor: "#00ffd5",
    svgGradId: "je-grad"
  },
  santiago: {
    callsign: "UNIT // 04",
    name: "Santiago",
    role: "Applied Cryptography & SecOps Automation",
    githubUser: "santiago",
    githubUrl: "https://github.com/santiago",
    status: "SYNCHRONIZED",
    bio: "Ingeniero de criptografía aplicada y automatización de despliegues seguros. Diseña sistemas de clave asimétrica resistentes al análisis post-cuántico, hardware hacking seguro y pipelines que integran verificación criptográfica end-to-end.",
    skills: ["Post-Quantum Cryptography", "ZK-Proofs & Elliptic Curves", "Hardware & Firmware Analysis", "Bash & Rust Automation", "Network Protocol Audits", "Secure Enclave Design"],
    projects: [
      {
        title: "AEGIS-CRYPTO PIPELINE",
        tag: "CRYPTOGRAPHY",
        desc: "Implementación ligera de esquemas de cifrado basados en retículos (Kyber/Dilithium) optimizados para dispositivos IoT de bajos recursos."
      },
      {
        title: "SEC-OPS AUTO-PATCHER",
        tag: "AUTOMATION",
        desc: "Demonio en Rust para verificación automática de firmas de software y remediación autónoma de parches de seguridad críticos."
      }
    ],
    svgColor: "#49ff63",
    svgGradId: "st-grad"
  }
};

// UI CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
  const soundEngine = new TacticalSoundEngine();

  // Audio Toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundStatus = document.getElementById('soundStatus');

  soundBtn.addEventListener('click', () => {
    soundEngine.enabled = !soundEngine.enabled;
    soundStatus.textContent = soundEngine.enabled ? 'ARMED' : 'MUTED';
    soundBtn.style.borderColor = soundEngine.enabled ? 'var(--hud-green-bright)' : '#ff5555';
    if (soundEngine.enabled) {
      soundEngine.playClick();
    }
  });

  // Attach Hover Sounds to interactive elements
  const interactiveElements = document.querySelectorAll('.operator-card, .hud-btn-mini, .modal-close-btn, .github-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      soundEngine.playHover();
    });
  });

  // Modal elements
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCloseAction = document.getElementById('modalCloseAction');
  const modalAvatarSlot = document.getElementById('modalAvatarSlot');
  const modalCallsign = document.getElementById('modalCallsign');
  const modalStatusBadge = document.getElementById('modalStatusBadge');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalGithubUser = document.getElementById('modalGithubUser');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalBio = document.getElementById('modalBio');
  const modalSkills = document.getElementById('modalSkills');
  const modalProjects = document.getElementById('modalProjects');

  // Open Modal logic
  function openOperatorModal(memberKey, sourceCard) {
    const data = TEAM_MEMBERS[memberKey];
    if (!data) return;

    soundEngine.playClick();

    // Populate data
    modalCallsign.textContent = data.callsign;
    modalStatusBadge.textContent = data.status;
    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalBio.textContent = data.bio;
    modalGithubLink.href = data.githubUrl;
    modalGithubUser.textContent = `GITHUB.COM/${data.githubUser.toUpperCase()}`;

    // Clone avatar SVG from card to keep tactical coherence
    if (sourceCard) {
      const svg = sourceCard.querySelector('.operator-svg');
      if (svg) {
        modalAvatarSlot.innerHTML = '';
        modalAvatarSlot.appendChild(svg.cloneNode(true));
      }
    }

    // Populate skills chips
    modalSkills.innerHTML = '';
    data.skills.forEach(skill => {
      const chip = document.createElement('span');
      chip.className = 'skill-chip';
      chip.textContent = `[ ${skill} ]`;
      modalSkills.appendChild(chip);
    });

    // Populate projects
    modalProjects.innerHTML = '';
    data.projects.forEach(proj => {
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML = `
        <div class="project-header">
          <span class="project-title">${proj.title}</span>
          <span class="project-tag">${proj.tag}</span>
        </div>
        <p class="project-desc">${proj.desc}</p>
      `;
      modalProjects.appendChild(item);
    });

    // Display modal
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal logic
  function closeModal() {
    if (!modalOverlay.classList.contains('active')) return;
    soundEngine.playClose();
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Add click listeners to cards
  const cards = document.querySelectorAll('.operator-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const member = card.getAttribute('data-member');
      openOperatorModal(member, card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const member = card.getAttribute('data-member');
        openOperatorModal(member, card);
      }
    });
  });

  // Close handlers
  closeModalBtn.addEventListener('click', closeModal);
  modalCloseAction.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
