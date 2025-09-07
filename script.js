// Mobile nav
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Theme toggle with storage and contrast-aware defaults
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(mode) {
  if (mode === 'light') root.classList.add('light');
  else root.classList.remove('light');
  localStorage.setItem('theme', mode);
}
const stored = localStorage.getItem('theme');
if (stored) setTheme(stored);
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');

themeToggle?.addEventListener('click', () => {
  const nowLight = !root.classList.contains('light');
  setTheme(nowLight ? 'light' : 'dark');
});

// Smooth scroll with focus management
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }, 400);
  });
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Lazy load images (modern browsers already do with loading="lazy"; here as a fallback)
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
}
