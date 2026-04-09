// ══════════════════════════════════════
// ACTIVE NAV
// ══════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();


// ══════════════════════════════════════
// SMOOTH SCROLL
// ══════════════════════════════════════
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ══════════════════════════════════════
// SCROLL REVEAL — simple & robust
// Uses scroll event fallback so it
// always works even if IntersectionObserver
// threshold isn't met.
// ══════════════════════════════════════
const revealEls = document.querySelectorAll('.reveal-item');

function revealOnScroll() {
  const windowH = window.innerHeight;
  revealEls.forEach((el, i) => {
    if (el.classList.contains('visible')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 60) {
      // Small stagger based on position among siblings
      const siblings = Array.from(el.parentElement.children);
      const idx = siblings.indexOf(el);
      setTimeout(() => el.classList.add('visible'), idx * 80);
    }
  });
}

// Run on scroll and on load
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
// Also run after a short delay to catch elements already in view
setTimeout(revealOnScroll, 100);
setTimeout(revealOnScroll, 400);
