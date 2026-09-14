/**
 * =========================================================================
 * MAIN ENTRY POINT // 9i7777 PORTFOLIO
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize canvas background
  if (window.initCanvasBackground) window.initCanvasBackground();

  // 2. Initialize developer terminal
  if (window.initTerminal) window.initTerminal();

  // 3. Initialize UI interactions (filters, modals, copy, theme, contact form)
  if (window.initUIInteractions) window.initUIInteractions();

  // 4. Scroll Reveal Animations (IntersectionObserver)
  setupScrollReveal();

  // 5. Active Link Highlight (Scrollspy)
  setupScrollSpy();

  // Console greeting
  console.log(
    `%c[ 9i7777 // DEV PORTFOLIO ] %cСайт загружен успешно. Исходный код чист и готов к работе!`,
    'background: #2563EB; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #10B981; font-weight: bold;'
  );
});

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
