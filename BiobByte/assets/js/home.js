/**
 * BioByte — assets/js/home.js
 * Home page scripts extracted from index.html.
 *
 * Sections:
 *  1. Navbar scroll state
 *  2. Mobile menu drawer
 *  3. Scroll-reveal (IntersectionObserver)
 *  4. Hero canvas — animated DNA helix
 */

/* =============================================
   1. NAVBAR — scroll state
   ============================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* =============================================
   2. MOBILE MENU
   ============================================= */
const menuToggle        = document.getElementById('menu-toggle');
const mobileMenu        = document.getElementById('mobile-menu');
const menuClose         = document.getElementById('menu-close');
const mobileFeaturesLink = document.getElementById('mobile-features-link');

function openMenu() {
  mobileMenu.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

// Close on backdrop click
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

// Close when navigating to a section via mobile menu
mobileFeaturesLink.addEventListener('click', closeMenu);


/* =============================================
   3. SCROLL-REVEAL (IntersectionObserver)
   ============================================= */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* =============================================
   4. HERO CANVAS — animated DNA helix
   Signature visual element: floating double-helix
   drawn as paired sinusoidal paths with
   connecting rungs, biology-authentic
   ============================================= */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, raf;

  /* Respect reduced motion preference */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Draw a single animated DNA helix column */
  function drawHelix(xCenter, amplitude, period, offset, t) {
    const steps    = Math.ceil(H / 3);
    const emerald  = 'rgba(16,185,129,';
    const dimGreen = 'rgba(16,185,129,';

    ctx.lineWidth = 1.5;

    /* Strand A */
    ctx.beginPath();
    ctx.strokeStyle = emerald + '0.55)';
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * H;
      const x = xCenter + Math.sin((y / period) * Math.PI * 2 + t + offset) * amplitude;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Strand B (phase-shifted by π) */
    ctx.beginPath();
    ctx.strokeStyle = dimGreen + '0.3)';
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * H;
      const x = xCenter + Math.sin((y / period) * Math.PI * 2 + t + offset + Math.PI) * amplitude;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Rungs (base pairs) */
    const rungCount = Math.floor(H / (period / 2));
    for (let r = 0; r <= rungCount; r++) {
      const y  = (r / rungCount) * H;
      const xA = xCenter + Math.sin((y / period) * Math.PI * 2 + t + offset) * amplitude;
      const xB = xCenter + Math.sin((y / period) * Math.PI * 2 + t + offset + Math.PI) * amplitude;

      /* Only draw rungs where strands are crossing (near midpoint) */
      const phase    = ((y / period) * Math.PI * 2 + t + offset) % (Math.PI * 2);
      const nearCross = Math.abs(Math.sin(phase)) < 0.35;
      if (!nearCross) continue;

      const opacity = 0.15 + 0.1 * (1 - Math.abs(Math.sin(phase)));
      ctx.beginPath();
      ctx.strokeStyle = `rgba(16,185,129,${opacity})`;
      ctx.lineWidth   = 1;
      ctx.moveTo(xA, y);
      ctx.lineTo(xB, y);
      ctx.stroke();
    }
  }

  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Two helices at different x positions */
    drawHelix(W * 0.75, 55, 260, 0,   t);
    drawHelix(W * 0.88, 30, 180, 1.2, t * 0.8);

    if (!prefersReduced) {
      t += 0.008;
    }

    raf = requestAnimationFrame(draw);
  }

  draw();

  /* Pause animation when tab is hidden (performance) */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });
})();