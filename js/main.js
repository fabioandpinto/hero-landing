/* =============================================
   HERO Landing Page — JavaScript
============================================= */

/* ─── Navbar scroll ────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 70);
});

/* ─── Mobile hamburger ──────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Scroll animations ─────────────────────── */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Stagger siblings for a cascading entrance
    const parent = entry.target.parentElement;
    const siblings = parent ? [...parent.querySelectorAll('.animate-on-scroll')] : [];
    const idx = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.max(0, idx * 80));

    scrollObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

/* ─── Counter animation ─────────────────────── */
function animateCount(el, target, duration) {
  const start = performance.now();
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.floor(easeOutQuart(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    animateCount(el, target, 1800);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

/* ─── Particle system ───────────────────────── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    const w = (Math.random() * 3 + 1).toFixed(1);
    const h = (Math.random() * 44 + 8).toFixed(0);
    const x = (Math.random() * 100).toFixed(1);
    const y = (Math.random() * 100).toFixed(1);
    const r = (Math.random() * 360).toFixed(0);
    const d = (Math.random() * 10 + 4).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);
    const alpha = (Math.random() * 0.22 + 0.04).toFixed(2);

    p.style.cssText = `
      position: absolute;
      width: ${w}px;
      height: ${h}px;
      background: rgba(204, 0, 0, ${alpha});
      left: ${x}%;
      top: ${y}%;
      transform: rotate(${r}deg);
      border-radius: 2px;
      animation: particleDrift ${d}s ease-in-out ${delay}s infinite;
    `;
    fragment.appendChild(p);
  }

  container.appendChild(fragment);

  // Inject keyframe once
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleDrift {
        0%   { opacity: 0; transform: translateY(0)      rotate(0deg); }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(-90px) rotate(200deg); }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ─── Smooth scroll for anchor links ───────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Active nav highlight on scroll ────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(s => activeSectionObserver.observe(s));
