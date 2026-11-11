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
    name: "Paula Duque",
    role: "Líder de Tecnología y Plataforma · Capitals Telecom BPO | Full-stack · CRM · Automatización con IA",
    githubUser: "duckie4u",
    githubUrl: "https://github.com/duckie4u",
    status: "ARMED // ACTIVE",
    bio: "Estudiante de Ingeniería de Sistemas y Computación en la Universidad de los Andes. Lidera el área de tecnología de Capitals Telecom BPO, donde construye la plataforma con la que los equipos atienden y venden por WhatsApp y otros canales. Como freelance, desarrolla páginas web y CRMs para empresas como La Tienda del Esfero Kawaii.",
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL", "APIs de mensajería (WhatsApp, Meta)", "Integración de LLMs", "E-commerce (WooCommerce)", "Apps móviles (iOS/Android)", "Vercel"],
    projects: [
      {
        title: "CRM OMNICANAL",
        tag: "PLATFORM & SALES",
        desc: "Plataforma integral para que equipos comerciales atiendan clientes desde un solo lugar y hagan seguimiento de cada venta. Está en producción con varias empresas."
      },
      {
        title: "ATENCIÓN CON IA",
        tag: "LLM & AUTOMATION",
        desc: "Asistentes inteligentes que responden y apoyan a los equipos en la conversación y conversión en tiempo real con el cliente."
      },
      {
        title: "LA TIENDA DEL ESFERO KAWAII",
        tag: "E-COMMERCE",
        desc: "Sitio web de comercio electrónico y catálogo de productos en línea de alta conversión."
      },
      {
        title: "APP MÓVIL (IOS / ANDROID)",
        tag: "MOBILE OPS",
        desc: "Versión móvil nativa/híbrida para iOS y Android de la plataforma de atención y gestión comercial."
      }
    ],
    svgColor: "#00ffaa",
    svgGradId: "mp-grad"
  },
  gonzalo: {
    callsign: "UNIT // 02",
    name: "Juan Daniel Gonzalo López Pedraza",
    role: "AI & Product Engineer | Estudiante de Ing. de Sistemas y Computación (Opción en Economía)",
    githubUser: "wandagoxd",
    githubUrl: "https://github.com/wandagoxd",
    status: "WEAPONIZED // ACTIVE",
    bio: "AI & Product Engineer y estudiante de Ingeniería de Sistemas y Computación con opción académica en Economía en la Universidad de los Andes. Combina una sólida base técnica en arquitectura de software, inteligencia artificial, visión por computador y modelos generativos con visión estratégica de negocio y diseño de producto digital. Experiencia liderando y construyendo soluciones interactivas de punta a punta: desde la formulación, diseño UX/UI y ciclo de vida de producto hasta el despliegue de modelos de voz, pipelines de visión artificial en tiempo real y sistemas de robótica de servicio.",
    skills: [
      "Diseño & Gestión de Producto (UX/UI, MVPs)",
      "Criterio Económico & Modelado de Incentivos",
      "Modelos de Voz & Audio (TTS/STT)",
      "MediaPipe Hands & Tracking Gestual",
      "Visión Artificial (ONNX Runtime, YOLO, OpenCV)",
      "ROS 2 (Jazzy) & Robótica de Servicio",
      "Integración de LLMs vía API",
      "Full-Stack: Python, Node.js, Express, TypeScript, Java",
      "Frontend: Angular, HTML5, CSS3, Bootstrap, Canvas 2D",
      "Cloud & DevOps: Docker, Firebase, Git, Linux (Ubuntu LTS)"
    ],
    projects: [
      {
        title: "HUSHIE — MODELOS DE VOZ (PROYECTO GANADOR EXPOANDES)",
        tag: "VOICE AI & EXPOANDES WINNER",
        desc: "Implementación y calibración de pipelines de audio y modelos generativos de voz para interacción conversacional en tiempo real. Optimización de latencia de síntesis y reconocimiento vocal con experiencia natural y fluida. Galardonado como ganador en ExpoAndes."
      },
      {
        title: "LIFETIME LABS — DIAGNÓSTICO & ORIENTACIÓN VOCACIONAL",
        tag: "CO-FOUNDER & PRODUCT ARCHITECT",
        desc: "Plataforma web para diagnóstico vocacional recursivo y simulación interactiva de trayectorias profesionales. Microservicios en Node.js, Cloud Firestore y generación dinámica de escenarios con LLMs."
      },
      {
        title: "CANVAS INTERACTIVO DE DIBUJO POR GESTOS",
        tag: "COMPUTER VISION",
        desc: "Aplicación de visión artificial que traduce tracking de manos y gestos a trazos en un lienzo digital en tiempo real con MediaPipe Hands y OpenCV (clasificación de modos: dibujo, cursor, borrador y herramientas)."
      },
      {
        title: "MARKETPLACE INMOBILIARIO — PLATAFORMA TRANSACCIONAL",
        tag: "FULLSTACK & PRODUCT",
        desc: "Marketplace web especializado para comercialización de inmuebles, filtros avanzados, roles dinámicos (compradores, agentes, administradores) e interfaz optimizada para conversión ágil."
      },
      {
        title: "SINFONIA (UNIANDES) — VISIÓN & NAVEGACIÓN ROBÓTICA",
        tag: "ROBOTICS & ROS 2",
        desc: "Módulos de percepción para robots de servicio Pepper (Opera y Nova). Canalizaciones de inferencia en tiempo real en C++, ONNX Runtime y redes YOLO en Docker sobre ROS 2 (Jazzy)."
      }
    ],
    svgColor: "#39ff14",
    svgGradId: "gz-grad"
  },
  juan: {
    callsign: "UNIT // 03",
    name: "Juan Esteban",
    role: "Software Engineering & Tech Product Strategy",
    githubUser: "juanesteban-gomez",
    githubUrl: "https://github.com/juanesteban-gomez",
    status: "SCANNING NET // ACTIVE",
    bio: "Estudiante de Ingeniería de Sistemas y Computación apasionado por desarrollar soluciones de software innovadoras que resuelvan problemas reales. Disfruta liderar el marketing y la estrategia de comercialización de productos tecnológicos, asegurando que las buenas ideas se conecten con los usuarios y generen impacto. Sus principales fortalezas incluyen el liderazgo, el trabajo en equipo, la comunicación asertiva y una alta capacidad de aprendizaje continuo.",
    skills: [
      "Estrategia de Producto & Go-To-Market",
      "Marketing Tecnológico & Adquisición",
      "Desarrollo de Software & Arquitectura",
      "Liderazgo Técnico & Comunicación Asertiva",
      "Trabajo en Equipo & Resolución de Problemas",
      "Aprendizaje Continuo & Metodologías Ágiles"
    ],
    projects: [
      {
        title: "GO-TO-MARKET & TECH PRODUCT STRATEGY",
        tag: "PRODUCT MARKETING",
        desc: "Diseño y ejecución de estrategias de comercialización y posicionamiento para productos tecnológicos y soluciones de software de alto impacto."
      },
      {
        title: "INNOVATIVE SOFTWARE SOLUTIONS",
        tag: "FULL-STACK DEV",
        desc: "Desarrollo de herramientas de software enfocadas en resolver problemáticas reales con arquitecturas ágiles, usabilidad intuitiva y validación con usuarios."
      }
    ],
    svgColor: "#00ffd5",
    svgGradId: "je-grad"
  },
  santiago: {
    callsign: "UNIT // 04",
    name: "Santiago",
    role: "AI Engineer · Speech & LLM Systems",
    githubUser: "santiesc06",
    githubUrl: "https://github.com/santiesc06",
    status: "SYNCHRONIZED",
    bio: "Estudiante de Ingeniería de Sistemas y Computación en la Universidad de los Andes. Lidera el área de Speech de SinfonIA, una iniciativa de robótica social: ahí integra Whisper, detección de voz (VAD) y LLMs sobre ROS 2 para que el robot pueda conversar. Construye agentes LLM con evaluación automática, backends en FastAPI y apps que conectan voz, móvil y wearables.",
    skills: ["Python", "FastAPI LLM Agents & Evals (LangChain) Whisper", " VAD", "STT ROS 2 RAG & Vector Search PostgreSQL", "Docker", "CI Kotlin", "Jetpack Compose Reinforcement Learning (PPO)"],
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

  // Setup profile image helper with multi-extension check (.jpeg, .png, .jpg, .webp) + fallback to SVG
  function setupMemberImage(container, memberKey, altText, defaultSvg) {
    container.innerHTML = '';
    const extensions = ['jpeg', 'png', 'jpg', 'webp'];
    
    function tryLoadExtension(index) {
      if (index >= extensions.length) {
        // Fallback al icono táctico SVG
        container.innerHTML = '';
        if (defaultSvg) {
          container.appendChild(defaultSvg.cloneNode(true));
        }
        return;
      }
      const ext = extensions[index];
      const img = new Image();
      img.src = `assets/team/${memberKey}.${ext}`;
      img.alt = altText;
      img.className = 'operator-img';

      img.onload = () => {
        container.innerHTML = '';
        container.appendChild(img);
      };

      img.onerror = () => {
        tryLoadExtension(index + 1);
      };
    }

    tryLoadExtension(0);
  }

  // Populate card avatars on load
  document.querySelectorAll('.operator-card').forEach(card => {
    const member = card.getAttribute('data-member');
    const avatarFrame = card.querySelector('.avatar-frame');
    const initialSvg = card.querySelector('.operator-svg');
    if (avatarFrame && member) {
      // Create an image wrapper inside avatar frame
      let imgHolder = avatarFrame.querySelector('.avatar-img-holder');
      if (!imgHolder) {
        imgHolder = document.createElement('div');
        imgHolder.className = 'avatar-img-holder';
        avatarFrame.prepend(imgHolder);
      }
      setupMemberImage(imgHolder, member, member, initialSvg);
    }
  });

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

    // Display photo or fallback SVG in modal
    const fallbackSvg = sourceCard ? sourceCard.querySelector('.operator-svg') : null;
    setupMemberImage(modalAvatarSlot, memberKey, data.name, fallbackSvg);

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
