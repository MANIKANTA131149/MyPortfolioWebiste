// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('done');
    // Trigger AOS after preloader
    setTimeout(() => initAOS(), 100);
  }, 1800);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ============================================
// READING PROGRESS BAR
// ============================================
const progressBar = document.getElementById('readingProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ============================================
// HAMBURGER MENU
// ============================================
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

// ============================================
// DARK / LIGHT THEME
// ============================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const curr = document.body.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================
// TYPEWRITER
// ============================================
window.addEventListener('load', () => {
  new Typed('#typewriter', {
    strings: [
      'production LLM apps',
      'RAG pipelines',
      'agentic workflows',
      'scalable AI systems',
      'cloud AI infrastructure'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2200,
    loop: true,
    showCursor: false
  });
});

// ============================================
// PARTICLE CANVAS
// ============================================
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el, target, suffix, decimals = 0, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = start.toFixed(decimals) + suffix;
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ============================================
// SCROLL-BASED ANIMATIONS (Custom AOS)
// ============================================
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('aos-visible');
          // Trigger counters
          const counterEls = entry.target.querySelectorAll('[data-count]');
          counterEls.forEach(cel => {
            if (!cel.dataset.counted) {
              cel.dataset.counted = true;
              const target = parseFloat(cel.dataset.count);
              const suffix = cel.dataset.suffix || '';
              const decimals = parseInt(cel.dataset.decimal || '0');
              animateCounter(cel, target, suffix, decimals);
            }
          });
          // Proficiency bars
          const bars = entry.target.querySelectorAll('.pb-fill[data-width]');
          bars.forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
          // Hero stat counters
          const hstats = entry.target.querySelectorAll('.hstat[data-count]');
          hstats.forEach(hs => {
            if (!hs.dataset.counted) {
              hs.dataset.counted = true;
              const numEl = hs.querySelector('.hstat-n');
              const target = parseFloat(hs.dataset.count);
              const suffix = hs.dataset.suffix || '';
              const decimals = parseInt(hs.dataset.decimal || '0');
              animateCounter(numEl, target, suffix, decimals);
            }
          });
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));

  // Also trigger already visible elements
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('aos-visible');
  });

  // Hero stats (not wrapped in data-aos)
  const heroStatObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.hstat[data-count]').forEach(hs => {
          if (!hs.dataset.counted) {
            hs.dataset.counted = true;
            const numEl = hs.querySelector('.hstat-n');
            const target = parseFloat(hs.dataset.count);
            const suffix = hs.dataset.suffix || '';
            const decimals = parseInt(hs.dataset.decimal || '0');
            animateCounter(numEl, target, suffix, decimals);
          }
        });
        heroStatObs.disconnect();
      }
    });
  }, { threshold: 0.1 });
  const statsRow = document.querySelector('.hero-stats-row');
  if (statsRow) heroStatObs.observe(statsRow);

  // Metric cards counter
  const metricObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.metric-value[data-count]').forEach(mv => {
          if (!mv.dataset.counted) {
            mv.dataset.counted = true;
            const target = parseFloat(mv.dataset.count);
            const suffix = mv.dataset.suffix || '';
            const decimals = parseInt(mv.dataset.decimal || '0');
            animateCounter(mv, target, suffix, decimals);
          }
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.metric-card').forEach(mc => metricObs.observe(mc));

  // Proficiency bars
  const profObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.pb-fill[data-width]').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.proficiency-section').forEach(ps => profObs.observe(ps));
}

// ============================================
// ACTIVE NAV HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ============================================
// EXPERIENCE TABS
// ============================================
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.exp;
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.exp-panel[data-panel="${idx}"]`).classList.add('active');
  });
});

// ============================================
// SKILL FILTER
// ============================================
document.querySelectorAll('.sf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.sk-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ============================================
// PROJECT FILTER
// ============================================
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.pf;
    document.querySelectorAll('.proj-card').forEach(card => {
      const match = filter === 'all' || card.dataset.ptag === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ============================================
// RADAR CHART (pure canvas)
// ============================================
function drawRadar() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - 30;

  const skills = [
    { label: 'LLMs/RAG', value: 0.95 },
    { label: 'Agentic AI', value: 0.88 },
    { label: 'Cloud/Ops', value: 0.85 },
    { label: 'Backend', value: 0.92 },
    { label: 'Data/DB', value: 0.87 },
    { label: 'NLP', value: 0.85 }
  ];

  const n = skills.length;
  const angleStep = (Math.PI * 2) / n;
  const isDark = document.body.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const labelColor = isDark ? 'rgba(148,163,192,0.9)' : '#475569';

  ctx.clearRect(0, 0, W, H);

  // Grid rings
  for (let ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = R * (ring / 4);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Spokes
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
    ctx.strokeStyle = gridColor;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  skills.forEach((s, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = R * s.value;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, 'rgba(59,130,246,0.35)');
  grad.addColorStop(1, 'rgba(139,92,246,0.15)');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dots & labels
  skills.forEach((s, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = R * s.value;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();

    const lx = cx + Math.cos(angle) * (R + 18);
    const ly = cy + Math.sin(angle) * (R + 18);
    ctx.fillStyle = labelColor;
    ctx.font = '600 10px "Instrument Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.label, lx, ly);
  });
}

document.addEventListener('DOMContentLoaded', drawRadar);
document.getElementById('themeToggle').addEventListener('click', () => setTimeout(drawRadar, 50));

// ============================================
// CONTACT FORM
// ============================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.cf-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Sent!';
    document.getElementById('cfSuccess').style.display = 'block';
    e.target.reset();
    // Confetti!
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 }, colors: ['#3b82f6','#8b5cf6','#10b981'] });
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 3000);
  }, 1200);
}

// ============================================
// EASTER EGG — triple click on profile photo
// ============================================
let clickCount = 0;
const profilePhoto = document.getElementById('profilePhoto');
if (profilePhoto) {
  profilePhoto.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 3) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 }, colors: ['#3b82f6','#8b5cf6','#10b981','#f59e0b'] });
      clickCount = 0;
    }
  });
}

// ============================================
// BACK TO TOP
// ============================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// RESIZE — redraw radar on theme change
// ============================================
window.addEventListener('resize', drawRadar);
