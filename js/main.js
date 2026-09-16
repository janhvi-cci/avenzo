/* AVENZO - Core Application JS */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobilePanel = document.querySelector('.mobile-nav-panel');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');
  const mobileClose = document.querySelector('.mobile-nav-close');

  const openMobileMenu = () => {
    if (mobilePanel && mobileBackdrop) {
      mobilePanel.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    if (mobilePanel && mobileBackdrop) {
      mobilePanel.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.fade-in-up, .card, .problem-card, .ecosystem-card, .timeline-step-card, .roadmap-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  initAvenzoAssistant();

});

/* Hardcoded knowledge base for the frontend-only AVENZO Assistant. */
const avenzoAssistantKnowledge = {
  about: {
    question: 'What is AVENZO?',
    keywords: ['what is avenzo', 'about avenzo', 'avenzo'],
    answer: "AVENZO is India's B2B EV business network, connecting manufacturers, distributors, businesses, fleets and institutions through one trusted network.\n\nIt helps create a clearer path from credible EV supply to meaningful commercial demand.",
    followUps: ['whoCanJoin', 'howItWorks', 'verified']
  },
  does: {
    question: 'What does AVENZO do?',
    keywords: ['what does avenzo do', 'what do you do', 'purpose'],
    answer: 'AVENZO provides a structured business connectivity layer for the EV ecosystem.\n\nIt helps businesses discover relevant counterparties, understand opportunities, establish credibility and build commercial relationships.',
    followUps: ['howItWorks', 'opportunities', 'whoCanJoin']
  },
  whoCanJoin: {
    question: 'Who can join AVENZO?',
    keywords: ['who can join', 'eligible', 'eligibility'],
    answer: 'AVENZO is designed for businesses across the EV ecosystem, including:\n\n• EV manufacturers\n• Distributors and dealers\n• Fleets and businesses\n• Institutions\n• Charging infrastructure providers\n• EV finance and leasing\n• Service and maintenance providers\n• Spare parts and component businesses\n• Telematics and software providers',
    followUps: ['manufacturers', 'distributors', 'fleets', 'institutions']
  },
  manufacturers: {
    question: 'How can AVENZO help manufacturers?',
    keywords: ['manufacturer', 'manufacturers', 'manufacturing'],
    answer: 'Manufacturers can use AVENZO to expand regional distribution, discover qualified dealers, reach fleet and institutional buyers, and increase visibility for relevant business opportunities.',
    followUps: ['join', 'findDistributor', 'verified']
  },
  distributors: {
    question: 'How can AVENZO help distributors and dealers?',
    keywords: ['distributor', 'distributors', 'dealer', 'dealers'],
    answer: 'Distributors and dealers can use AVENZO to discover credible EV brands, explore distribution opportunities, understand relevant territories and connect with commercial EV product suppliers.',
    followUps: ['findManufacturer', 'opportunities', 'join']
  },
  fleets: {
    question: 'How can AVENZO help fleets and businesses?',
    keywords: ['fleet', 'fleets', 'source ev', 'sourcing ev', 'businesses'],
    answer: 'Fleets and businesses can use AVENZO to find suitable EV products, explore structured supplier connections, respond to relevant opportunities and source deployment partners.',
    followUps: ['findManufacturer', 'requirement', 'finance']
  },
  institutions: {
    question: 'How can AVENZO help institutions?',
    keywords: ['institution', 'institutions', 'procurement', 'campus', 'municipal'],
    answer: 'Institutions can explore structured EV procurement pathways for use cases such as campus mobility, healthcare, public-sector requirements and municipal mobility.',
    followUps: ['requirement', 'verified', 'charging']
  },
  howItWorks: {
    question: 'How does AVENZO work?',
    keywords: ['how does avenzo work', 'how it works', 'process'],
    answer: 'AVENZO follows a simple four-step process:\n\n01 — Join\nTell us about your organisation, operational scope, products and business objectives.\n\n02 — Verify\nAVENZO reviews credibility, capability, compliance and business readiness.\n\n03 — Connect\nRelevant counterparties, distributors, fleet requirements and business opportunities are connected.\n\n04 — Grow\nBusinesses can build partnerships, expand distribution and pursue structured procurement opportunities.',
    followUps: ['join', 'verified', 'opportunities']
  },
  verified: {
    question: 'What is AVENZO Verified?',
    keywords: ['avenzo verified', 'verified', 'verification'],
    answer: 'AVENZO Verified is a structured business verification framework designed to build confidence across the EV ecosystem.\n\nIt focuses on three areas:\n\nCredibility — understanding the organisation, track record and ownership.\n\nCapability — assessing production capacity, technical information, testing certifications and warranty terms.\n\nReadiness — evaluating supply-chain reliability, after-sales readiness and commercial capability.',
    followUps: ['howItWorks', 'whoCanJoin', 'join']
  },
  opportunities: {
    question: 'What are business opportunities?',
    keywords: ['business opportunity', 'business opportunities', 'opportunity', 'opportunities', 'rfq', 'distribution request'],
    answer: 'AVENZO connects businesses with relevant commercial opportunities such as distribution requests, fleet requirements and institutional procurement requirements.\n\nThe goal is to connect capable supply with meaningful business demand.',
    followUps: ['requirement', 'manufacturers', 'distributors']
  },
  requirement: {
    question: 'I want to post a requirement',
    keywords: ['post a requirement', 'requirement', 'request for proposal', 'rfp'],
    answer: "If you are looking for EV products, distributors, suppliers, deployment partners or other business connections, you can use the 'Post a Requirement' option on the website.\n\nYour requirement can then be structured around the relevant business need.",
    followUps: ['opportunities', 'findManufacturer', 'contact'],
    action: { label: 'Post a Requirement', href: 'requirement.html' }
  },
  join: {
    question: 'I want to join AVENZO',
    keywords: ['join avenzo', 'joining avenzo', 'how to join', 'join', 'joining'],
    answer: "To join the AVENZO network, use the 'Join AVENZO' option in the website navigation.\n\nYou can provide information about your organisation, location, business activities, EV categories and what you are looking to achieve through AVENZO.",
    followUps: ['whoCanJoin', 'howItWorks', 'verified'],
    action: { label: 'Join AVENZO', href: 'join.html' }
  },
  charging: {
    question: 'Tell me about charging infrastructure',
    keywords: ['charging infrastructure', 'charging', 'charger'],
    answer: "Charging infrastructure is one of the integrated enablers within the AVENZO EV ecosystem.\n\nAVENZO's network approach brings infrastructure-related businesses into the broader EV business ecosystem.",
    followUps: ['whoCanJoin', 'fleets', 'requirement']
  },
  finance: {
    question: 'Tell me about EV finance and leasing',
    keywords: ['finance and leasing', 'ev finance', 'finance', 'leasing', 'lease'],
    answer: 'EV finance and leasing are part of the broader ecosystem that AVENZO connects alongside manufacturers, distributors, fleets, businesses and institutions.',
    followUps: ['fleets', 'whoCanJoin', 'join']
  },
  service: {
    question: 'Tell me about service and maintenance',
    keywords: ['service and maintenance', 'service', 'maintenance', 'after sales'],
    answer: 'Service and maintenance providers are part of the EV ecosystem connected through AVENZO, helping support the operational side of EV deployment.',
    followUps: ['spares', 'whoCanJoin', 'join']
  },
  spares: {
    question: 'Tell me about spare parts and components',
    keywords: ['spare parts', 'spares', 'components', 'component'],
    answer: 'Spare parts and component businesses form an important part of the EV supply chain and are among the ecosystem participants AVENZO aims to connect.',
    followUps: ['service', 'manufacturers', 'join']
  },
  telematics: {
    question: 'Tell me about telematics and software',
    keywords: ['telematics', 'software', 'technology provider'],
    answer: 'Telematics and software are integrated EV ecosystem capabilities that can support fleets, businesses and vehicle operations.',
    followUps: ['fleets', 'whoCanJoin', 'join']
  },
  panIndia: {
    question: 'Is AVENZO a PAN-India network?',
    keywords: ['pan india', 'pan-india', 'across india', 'india network'],
    answer: "AVENZO's vision is to build a PAN-India EV business network connecting regional supply with demand across India's major business corridors.\n\nThe roadmap progresses from a focused pilot to regional scale, a PAN-India network and eventually broader national EV business infrastructure.",
    followUps: ['about', 'howItWorks', 'join']
  },
  ecommerce: {
    question: 'Is AVENZO an e-commerce website?',
    keywords: ['e-commerce', 'ecommerce', 'marketplace', 'online store'],
    answer: 'AVENZO is positioned as a B2B business network rather than a conventional consumer e-commerce marketplace.\n\nIts focus is business connectivity, discovery, verification and commercial opportunities across the EV ecosystem.',
    followUps: ['does', 'howItWorks', 'sellsEvs']
  },
  sellsEvs: {
    question: 'Does AVENZO sell EVs directly?',
    keywords: ['sell ev', 'sells ev', 'buy ev', 'ev store', 'sell vehicles'],
    answer: "AVENZO's primary role is business connectivity across the EV ecosystem. It helps connect manufacturers, distributors, fleets, businesses, institutions and ecosystem partners rather than functioning as a conventional consumer EV store.",
    followUps: ['findManufacturer', 'requirement', 'does']
  },
  findDistributor: {
    question: 'How can I find a distributor?',
    keywords: ['find a distributor', 'find distributor', 'distribution partner', 'find dealers'],
    answer: 'If you are an EV manufacturer looking for distribution partners, AVENZO can provide a structured environment to discover relevant distributors and dealers and explore regional business opportunities.',
    followUps: ['manufacturers', 'opportunities', 'join']
  },
  findManufacturer: {
    question: 'How can I find an EV manufacturer?',
    keywords: ['find an ev manufacturer', 'find manufacturer', 'ev supplier', 'find ev brand'],
    answer: 'If you are a distributor, dealer, fleet or business looking for EV products, AVENZO provides a structured business network for discovering relevant EV manufacturers and commercial opportunities.',
    followUps: ['distributors', 'fleets', 'requirement']
  },
  contact: {
    question: 'How can I contact AVENZO?',
    keywords: ['contact avenzo', 'contact', 'get in touch', 'speak to avenzo'],
    answer: 'Use the Join AVENZO or Post a Requirement options on the website to start a business conversation with AVENZO.',
    followUps: ['join', 'requirement']
  }
};

const avenzoAssistantSpecial = {
  greeting: {
    answer: "Hello! 👋 Welcome to AVENZO.\n\nI'm here to help you navigate India's EV business network.\n\nWhat would you like to explore?",
    followUps: ['about', 'howItWorks', 'whoCanJoin', 'verified', 'requirement']
  },
  thanks: {
    answer: "You're welcome! 🤝\n\nWhenever you're ready, I can help you explore the AVENZO network.",
    followUps: ['about', 'join', 'requirement']
  },
  goodbye: {
    answer: 'See you in the AVENZO network. ⚡',
    followUps: []
  },
  unknown: {
    answer: "I'm still learning the AVENZO conversation map.\n\nI can help with:\n• AVENZO\n• Joining the network\n• EV manufacturers\n• Distributors & dealers\n• Fleets & businesses\n• Institutions\n• AVENZO Verified\n• Business opportunities\n• Posting a requirement\n• EV ecosystem services\n\nTry asking me one of these.",
    followUps: ['about', 'whoCanJoin', 'verified', 'requirement']
  }
};

function initAvenzoAssistant() {
  if (document.querySelector('.avenzo-chatbot')) return;

  const icon = (paths, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const chatIcon = icon('<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>', 23);
  const closeIcon = icon('<path d="M18 6 6 18M6 6l12 12"/>');
  const clearIcon = icon('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/>', 17);
  const sendIcon = icon('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', 18);

  const root = document.createElement('aside');
  root.className = 'avenzo-chatbot';
  root.setAttribute('aria-label', 'AVENZO Assistant');
  root.innerHTML = `
    <section class="avenzo-chat-panel" id="avenzo-chat-panel" role="dialog" aria-modal="false" aria-labelledby="avenzo-chat-title" aria-hidden="true">
      <header class="avenzo-chat-header">
        <div class="avenzo-chat-identity">
          <span class="avenzo-chat-status" aria-label="Online"></span>
          <div>
            <h2 class="avenzo-chat-title" id="avenzo-chat-title">AVENZO Assistant</h2>
            <p class="avenzo-chat-subtitle">Your EV Business Network Guide</p>
          </div>
        </div>
        <div class="avenzo-chat-header-actions">
          <button class="avenzo-chat-icon-button avenzo-chat-clear" type="button" aria-label="Clear chat" title="Clear chat">${clearIcon}</button>
          <button class="avenzo-chat-icon-button avenzo-chat-close" type="button" aria-label="Close chat" title="Close chat">${closeIcon}</button>
        </div>
      </header>
      <div class="avenzo-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <nav class="avenzo-chat-quick-actions" aria-label="AVENZO quick actions">
        <a href="index.html">Explore AVENZO</a>
        <a href="how-it-works.html">How It Works</a>
        <a href="verified.html">AVENZO Verified</a>
        <a href="join.html">Join AVENZO</a>
        <a href="requirement.html">Post a Requirement</a>
      </nav>
      <form class="avenzo-chat-form">
        <input class="avenzo-chat-input" type="text" placeholder="Ask AVENZO anything..." aria-label="Ask AVENZO anything" autocomplete="off">
        <button class="avenzo-chat-send" type="submit" aria-label="Send message">${sendIcon}</button>
      </form>
    </section>
    <button class="avenzo-chat-toggle" type="button" aria-label="Open AVENZO Assistant" aria-controls="avenzo-chat-panel" aria-expanded="false">${chatIcon}</button>`;
  document.body.appendChild(root);

  const panel = root.querySelector('.avenzo-chat-panel');
  const toggle = root.querySelector('.avenzo-chat-toggle');
  const close = root.querySelector('.avenzo-chat-close');
  const clear = root.querySelector('.avenzo-chat-clear');
  const messages = root.querySelector('.avenzo-chat-messages');
  const form = root.querySelector('.avenzo-chat-form');
  const input = root.querySelector('.avenzo-chat-input');
  let hasWelcomed = false;
  let replyTimer;

  const timeLabel = () => new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date());
  const scrollToLatest = () => { messages.scrollTop = messages.scrollHeight; };

  function addMessage(text, sender, action) {
    const message = document.createElement('div');
    message.className = `avenzo-chat-message${sender === 'user' ? ' is-user' : ''}`;
    const bubble = document.createElement('div');
    bubble.className = 'avenzo-chat-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    if (action && sender !== 'user') {
      const link = document.createElement('a');
      link.className = 'avenzo-chat-action';
      link.href = action.href;
      link.textContent = action.label;
      message.appendChild(link);
    }
    const time = document.createElement('span');
    time.className = 'avenzo-chat-time';
    time.textContent = timeLabel();
    message.appendChild(time);
    messages.appendChild(message);
    scrollToLatest();
  }

  function addChips(ids) {
    if (!ids || !ids.length) return;
    const chips = document.createElement('div');
    chips.className = 'avenzo-chat-chips';
    ids.forEach(id => {
      const item = avenzoAssistantKnowledge[id];
      if (!item) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'avenzo-chat-chip';
      button.textContent = item.question;
      button.addEventListener('click', () => askQuestion(item.question, id));
      chips.appendChild(button);
    });
    messages.appendChild(chips);
    scrollToLatest();
  }

  function welcome() {
    messages.innerHTML = '';
    addMessage("Welcome to AVENZO 👋\n\nI'm the AVENZO Assistant. I can help you understand the EV business network, find the right AVENZO pathway, and learn how to get started.", 'bot');
    addChips(['about', 'whoCanJoin', 'howItWorks', 'verified', 'requirement', 'join']);
    hasWelcomed = true;
  }

  function getResponse(value) {
    const normalized = value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(normalized)) return avenzoAssistantSpecial.greeting;
    if (/^(thanks|thank you|thankyou)\b/.test(normalized)) return avenzoAssistantSpecial.thanks;
    if (/^(bye|goodbye|see you)\b/.test(normalized)) return avenzoAssistantSpecial.goodbye;

    let bestMatch = null;
    let bestLength = 0;
    Object.values(avenzoAssistantKnowledge).forEach(item => {
      item.keywords.forEach(keyword => {
        if (normalized.includes(keyword) && keyword.length > bestLength) {
          bestMatch = item;
          bestLength = keyword.length;
        }
      });
    });
    return bestMatch || avenzoAssistantSpecial.unknown;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'avenzo-chat-message avenzo-chat-typing-row';
    typing.innerHTML = '<div class="avenzo-chat-bubble avenzo-chat-typing" aria-label="AVENZO Assistant is typing"><span></span><span></span><span></span></div>';
    messages.appendChild(typing);
    scrollToLatest();
    return typing;
  }

  function askQuestion(text, knownId) {
    const cleanText = text.trim();
    if (!cleanText) return;
    window.clearTimeout(replyTimer);
    root.querySelectorAll('.avenzo-chat-typing-row').forEach(item => item.remove());
    addMessage(cleanText, 'user');
    input.value = '';
    const response = knownId ? avenzoAssistantKnowledge[knownId] : getResponse(cleanText);
    const typing = showTyping();
    replyTimer = window.setTimeout(() => {
      typing.remove();
      addMessage(response.answer, 'bot', response.action);
      addChips(response.followUps);
    }, 300);
  }

  function setOpen(isOpen) {
    panel.classList.toggle('is-open', isOpen);
    panel.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close AVENZO Assistant' : 'Open AVENZO Assistant');
    toggle.innerHTML = isOpen ? closeIcon : chatIcon;
    if (isOpen) {
      if (!hasWelcomed) welcome();
      window.setTimeout(() => input.focus(), 150);
    } else {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close.addEventListener('click', () => setOpen(false));
  clear.addEventListener('click', welcome);
  form.addEventListener('submit', event => {
    event.preventDefault();
    askQuestion(input.value);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
  });
}

function initHeroNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Nodes definition
  const nodeTypes = [
    { label: 'EV Manufacturer', type: 'core', color: '#0a4d36', bg: '#ecfdf5', icon: 'factory' },
    { label: 'Distributor / Dealer', type: 'core', color: '#059669', bg: '#ecfdf5', icon: 'truck' },
    { label: 'Fleet & Mobility', type: 'core', color: '#0d9488', bg: '#f0fdfa', icon: 'car' },
    { label: 'Institutions & PSU', type: 'core', color: '#166534', bg: '#f0fdf4', icon: 'building' },
    { label: 'Charging Infra', type: 'sub', color: '#0284c7', bg: '#f0f9ff', icon: 'zap' },
    { label: 'EV Finance', type: 'sub', color: '#7c3aed', bg: '#faf5ff', icon: 'bank' },
    { label: 'Service & Spares', type: 'sub', color: '#ea580c', bg: '#fff7ed', icon: 'wrench' },
    { label: 'AVENZO Hub', type: 'center', color: '#0a4d36', bg: '#10b981', icon: 'network' }
  ];

  const nodes = [];
  const centerX = () => width / 2;
  const centerY = () => height / 2;

  // Center Node (AVENZO Hub)
  nodes.push({
    x: centerX(),
    y: centerY(),
    baseX: 0.5,
    baseY: 0.5,
    radius: 36,
    label: 'AVENZO Hub',
    sub: 'PAN-India Network',
    color: '#0a4d36',
    isCenter: true,
    vx: 0,
    vy: 0
  });

  // Surrounding Stakeholders
  const stakeholders = [
    { label: 'Manufacturers', sub: 'Supply & Scale', angle: 0 },
    { label: 'Distributors', sub: 'Regional Dealers', angle: Math.PI * 0.35 },
    { label: 'Fleets & Logistics', sub: 'Bulk Commercial', angle: Math.PI * 0.65 },
    { label: 'Institutions', sub: 'Govt & PSUs', angle: Math.PI * 1.0 },
    { label: 'Charging Infra', sub: 'Grid & Fast Charging', angle: Math.PI * 1.35 },
    { label: 'EV Finance', sub: 'Leasing & Debt', angle: Math.PI * 1.65 },
    { label: 'Service & Spares', sub: 'After-Sales Network', angle: Math.PI * 1.85 }
  ];

  stakeholders.forEach((s, idx) => {
    const distRatio = width < 480 ? 0.32 : 0.38;
    nodes.push({
      x: centerX() + Math.cos(s.angle) * (width * distRatio),
      y: centerY() + Math.sin(s.angle) * (height * distRatio),
      angle: s.angle,
      distRatio: distRatio,
      radius: width < 480 ? 20 : 26,
      label: s.label,
      sub: s.sub,
      color: '#10b981',
      speed: 0.0006 + (idx * 0.0001),
      isCenter: false,
      pulse: Math.random() * Math.PI
    });
  });

  // Animated packets moving along connections
  const packets = [];
  for (let i = 0; i < 8; i++) {
    packets.push({
      sourceIdx: 0,
      targetIdx: 1 + (i % (nodes.length - 1)),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.004
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const cX = centerX();
    const cY = centerY();

    // Update positions
    nodes.forEach((node, idx) => {
      if (node.isCenter) {
        node.x = cX;
        node.y = cY;
      } else {
        node.angle += node.speed;
        const currentDistX = width * (width < 480 ? 0.35 : 0.38);
        const currentDistY = height * (width < 480 ? 0.36 : 0.38);
        node.x = cX + Math.cos(node.angle) * currentDistX;
        node.y = cY + Math.sin(node.angle) * currentDistY;
        node.pulse += 0.03;
      }
    });

    // Draw Subtle India Map Grid Silhouette in background
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
    ctx.lineWidth = 1;
    for (let r = 50; r < Math.max(width, height) * 0.6; r += 50) {
      ctx.beginPath();
      ctx.arc(cX, cY, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Draw Connections between Center and Nodes
    const centerNode = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];

      // Connecting line
      ctx.beginPath();
      ctx.moveTo(centerNode.x, centerNode.y);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = 'rgba(10, 77, 54, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inter-node connections for mesh effect
      const nextNode = nodes[i === nodes.length - 1 ? 1 : i + 1];
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(nextNode.x, nextNode.y);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Data Packets
    packets.forEach(packet => {
      packet.progress += packet.speed;
      if (packet.progress > 1) {
        packet.progress = 0;
        packet.targetIdx = 1 + Math.floor(Math.random() * (nodes.length - 1));
      }

      const src = nodes[packet.sourceIdx];
      const tgt = nodes[packet.targetIdx];
      if (src && tgt) {
        const px = src.x + (tgt.x - src.x) * packet.progress;
        const py = src.y + (tgt.y - src.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw Nodes
    nodes.forEach((node, idx) => {
      if (node.isCenter) {
        // Center AVENZO Hub
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + Math.sin(Date.now() * 0.002) * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0a4d36';
        ctx.shadowColor = 'rgba(10, 77, 54, 0.3)';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Manrope, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AVENZO', node.x, node.y - 4);
        ctx.font = '9px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#6ee7b7';
        ctx.fillText('NETWORK', node.x, node.y + 9);
        ctx.restore();
      } else {
        // Outer Nodes
        ctx.save();
        // Pulse ring
        const pulseSize = 4 + Math.sin(node.pulse) * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
        ctx.fill();

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#0a4d36';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(0,0,0,0.06)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.stroke();

        // Node Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        // Labels
        ctx.fillStyle = '#0f172a';
        ctx.font = '600 11px Manrope, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);

        if (width > 480) {
          ctx.fillStyle = '#64748b';
          ctx.font = '10px Plus Jakarta Sans, sans-serif';
          ctx.fillText(node.sub, node.x, node.y + node.radius + 26);
        }
        ctx.restore();
      }
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}
