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

/* ─── Language toggle ───────────────────────── */
const translations = {
  es: {
    'page-title': 'HERO — Where Talent Meets Opportunity',
    'page-desc': 'HERO democratiza la inversión en atletas a nivel global. El talento decide el éxito, no la riqueza.',
    'hamburger-label': 'Abrir menú',
    'nav-problem': 'El Problema',
    'nav-solution': 'La Solución',
    'nav-market': 'Mercado',
    'nav-team': 'Equipo',
    'nav-join': 'Únete',
    'hero-subtitle': 'Democratizando la inversión en atletas a nivel global',
    'hero-mission-label': 'Misión',
    'hero-mission-text': '"El talento decide el éxito, no la riqueza."',
    'hero-founder-label': 'Fundado por:',
    'hero-founder-value': 'Jero — Piloto de Motorsport de élite',
    'hero-btn-discover': 'Descubrir la Plataforma',
    'hero-btn-market': 'Ver la Oportunidad',
    'prob-tag': 'El Problema',
    'prob-title': 'La Realidad Brutal',
    'prob-athletes-title': 'Atletas',
    'prob-athletes-text': 'Sin financiamiento. Sin coaching. Sin visibilidad. Sin camino hacia adelante.',
    'prob-institutions-title': 'Instituciones',
    'prob-institutions-text': 'Datos fragmentados. Scouting lento. Pipelines de talento débiles.',
    'stats-why': '¿Por qué<br>importa?',
    'stats-label-athletes': 'Atletas jóvenes en el mundo',
    'stats-label-cost': 'Costo anual para ser competitivo',
    'reality-from': 'Realidad',
    'reality-to': 'El éxito está determinado por la riqueza,<br>no por el talento.',
    'cons-title': '¿Qué pasa si no se soluciona?',
    'cons-1': 'Cada año, más de 300M de atletas abandonan sus sueños',
    'cons-2': 'El talento perdido representa más de $2.5T en valor económico no realizado',
    'cons-3': 'Las federaciones y gobiernos pierden atletas y líderes de clase mundial',
    'cons-4': '$50B anuales en brechas de entrenamiento sin financiamiento quedan sin alcanzar',
    'prob-badge': 'atletas sin acceso real a financiamiento ni visibilidad',
    'sol-tag': 'La Solución',
    'sol-title': 'La Plataforma HERO',
    'sol-subtitle': 'Hero conecta el talento con la oportunidad',
    'pillar-athlete': 'Atleta',
    'pillar-data': 'Datos',
    'pillar-visibility': 'Visibilidad',
    'pillar-support': 'Soporte',
    'sol-outcome-tag': 'El Resultado:',
    'sol-outcome-phrase': 'Éxito por talento,<br>no por riqueza.',
    'feat-01-title': 'Sistema de Ranking Verificado',
    'feat-01-text': 'Resultados oficiales de competencias vinculados a FIFA, FIA y organismos deportivos globales.',
    'feat-02-title': 'Oportunidades para Atletas',
    'feat-02-text': 'Acceso directo a instalaciones de entrenamiento, entrenadores, equipos y federaciones.',
    'feat-03-title': 'Recursos Basados en Datos',
    'feat-03-text': 'Federaciones, equipos y patrocinadores con descubrimiento de talento basado en datos.',
    'feat-04-title': 'Fondo de Inversión',
    'feat-04-text': 'Apoyo financiero y logístico para que los mejores talentos compitan al más alto nivel.',
    'mkt-tag': 'Oportunidad',
    'mkt-title': 'Oportunidad de Mercado',
    'mkt-1-name': 'Mercado Global de Sports Tech',
    'mkt-1-note': 'Crecimiento del 100% en 5 años (2030)',
    'mkt-2-name': 'Mercado Direccionable de HERO',
    'mkt-2-note': 'Financiamiento + Identificación de Talento + Rendimiento',
    'mkt-3-name': 'Inversiones de Impacto Deportivo',
    'mkt-3-note': '€4.20 ROI por cada €1 invertido (2024–2025)',
    'cust-title': 'Clientes Objetivo',
    'cust-1-title': 'Atletas de Élite',
    'cust-1-text': 'Talentos desatendidos que buscan visibilidad y financiamiento',
    'cust-2-title': 'Federaciones y Equipos',
    'cust-2-text': 'Necesitan pipelines de talento basados en datos',
    'cust-3-title': 'Patrocinadores e Inversores',
    'cust-3-text': 'En busca de talentos emergentes e impacto social',
    'cust-4-title': 'Gobiernos y Ministerios',
    'cust-4-text': 'Apuntando a fortalecer el talento nacional e internacional',
    'team-tag': 'Liderazgo',
    'team-title': 'Conoce al Equipo',
    'team-sub': 'Piloto de Motorsport de élite convertido en emprendedor tecnológico',
    'team-ach-1-span': 'compitiendo a nivel élite en los circuitos más importantes del mundo',
    'team-ach-2-strong': 'Ganador comprobado:',
    'team-ach-3-strong': 'Reconocido:',
    'team-ach-3-span': 'Piloto del Año — Federación Colombiana de Automovilismo (2022) · Forbes 70 Líderes del Futuro',
    'cta-tag': 'Únete al Movimiento',
    'cta-title': '¿Listo para cambiar<br>el deporte mundial?',
    'cta-sub': 'Sé parte de la revolución que hace que el talento, y no la riqueza, decida quién llega a la cima.',
    'cta-btn-primary': 'Conectar con HERO',
    'cta-btn-outline': 'Más Información',
    'footer-home': 'Inicio',
    'footer-problem': 'El Problema',
    'footer-solution': 'La Solución',
    'footer-market': 'Mercado',
    'footer-team': 'Equipo',
    'footer-quote': '"El talento decide el éxito,<br>no la riqueza."',
    'footer-copy': '© 2026 HERO. Todos los derechos reservados. — Fundado por Jero',
  },
  en: {
    'page-title': 'HERO — Where Talent Meets Opportunity',
    'page-desc': 'HERO democratizes investment in athletes globally. Talent decides success, not wealth.',
    'hamburger-label': 'Open menu',
    'nav-problem': 'The Problem',
    'nav-solution': 'The Solution',
    'nav-market': 'Market',
    'nav-team': 'Team',
    'nav-join': 'Join',
    'hero-subtitle': 'Democratizing investment in athletes globally',
    'hero-mission-label': 'Mission',
    'hero-mission-text': '"Talent decides success, not wealth."',
    'hero-founder-label': 'Founded by:',
    'hero-founder-value': 'Jero — Elite Motorsport Pilot',
    'hero-btn-discover': 'Discover the Platform',
    'hero-btn-market': 'See the Opportunity',
    'prob-tag': 'The Problem',
    'prob-title': 'The Brutal Reality',
    'prob-athletes-title': 'Athletes',
    'prob-athletes-text': 'No funding. No coaching. No visibility. No path forward.',
    'prob-institutions-title': 'Institutions',
    'prob-institutions-text': 'Fragmented data. Slow scouting. Weak talent pipelines.',
    'stats-why': 'Why does<br>it matter?',
    'stats-label-athletes': 'Young athletes worldwide',
    'stats-label-cost': 'Annual cost to be competitive',
    'reality-from': 'Reality',
    'reality-to': 'Success is determined by wealth,<br>not talent.',
    'cons-title': 'What happens if left unsolved?',
    'cons-1': 'Every year, over 300M athletes abandon their dreams',
    'cons-2': 'Lost talent represents over $2.5T in unrealized economic value',
    'cons-3': 'Federations and governments lose world-class athletes and leaders',
    'cons-4': '$50B annual training gaps remain unfunded',
    'prob-badge': 'athletes without real access to funding or visibility',
    'sol-tag': 'The Solution',
    'sol-title': 'The HERO Platform',
    'sol-subtitle': 'Hero connects talent with opportunity',
    'pillar-athlete': 'Athlete',
    'pillar-data': 'Data',
    'pillar-visibility': 'Visibility',
    'pillar-support': 'Support',
    'sol-outcome-tag': 'The Result:',
    'sol-outcome-phrase': 'Success by talent,<br>not wealth.',
    'feat-01-title': 'Verified Ranking System',
    'feat-01-text': 'Official competition results linked to FIFA, FIA and global sports bodies.',
    'feat-02-title': 'Opportunities for Athletes',
    'feat-02-text': 'Direct access to training facilities, coaches, teams and federations.',
    'feat-03-title': 'Data-Driven Resources',
    'feat-03-text': 'Federations, teams and sponsors with data-driven talent discovery.',
    'feat-04-title': 'Investment Fund',
    'feat-04-text': 'Financial and logistical support so top talents compete at the highest level.',
    'mkt-tag': 'Opportunity',
    'mkt-title': 'Market Opportunity',
    'mkt-1-name': 'Global Sports Tech Market',
    'mkt-1-note': '100% growth in 5 years (2030)',
    'mkt-2-name': "HERO's Addressable Market",
    'mkt-2-note': 'Funding + Talent Identification + Performance',
    'mkt-3-name': 'Sports Impact Investments',
    'mkt-3-note': '€4.20 ROI for every €1 invested (2024–2025)',
    'cust-title': 'Target Customers',
    'cust-1-title': 'Elite Athletes',
    'cust-1-text': 'Underserved talents seeking visibility and funding',
    'cust-2-title': 'Federations and Teams',
    'cust-2-text': 'Need data-driven talent pipelines',
    'cust-3-title': 'Sponsors and Investors',
    'cust-3-text': 'Seeking emerging talents and social impact',
    'cust-4-title': 'Governments and Ministries',
    'cust-4-text': 'Aiming to strengthen national and international talent',
    'team-tag': 'Leadership',
    'team-title': 'Meet the Team',
    'team-sub': 'Elite Motorsport Pilot turned tech entrepreneur',
    'team-ach-1-span': "competing at elite level on the world's most important circuits",
    'team-ach-2-strong': 'Proven Winner:',
    'team-ach-3-strong': 'Recognized:',
    'team-ach-3-span': 'Pilot of the Year — Colombian Motorsport Federation (2022) · Forbes 70 Future Leaders',
    'cta-tag': 'Join the Movement',
    'cta-title': 'Ready to change<br>world sports?',
    'cta-sub': 'Be part of the revolution that makes talent, not wealth, decide who reaches the top.',
    'cta-btn-primary': 'Connect with HERO',
    'cta-btn-outline': 'More Information',
    'footer-home': 'Home',
    'footer-problem': 'The Problem',
    'footer-solution': 'The Solution',
    'footer-market': 'Market',
    'footer-team': 'Team',
    'footer-quote': '"Talent decides success,<br>not wealth."',
    'footer-copy': '© 2026 HERO. All rights reserved. — Founded by Jero',
  }
};

let currentLang = 'es';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });

  document.title = t['page-title'];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t['page-desc']);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('hero-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

applyLanguage(localStorage.getItem('hero-lang') || 'es');
