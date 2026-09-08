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

});

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
