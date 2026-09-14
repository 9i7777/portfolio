/**
 * =========================================================================
 * UI INTERACTIONS & LOGIC // 9i7777
 * =========================================================================
 */

window.initUIInteractions = function() {
  renderProjects('all');
  initFilters();
  initThemeToggle();
  initCopyButtons();
  initContactForm();
  initMobileNav();
  initPlayground();
};

/**
 * Render Project Cards & Blueprint Slot
 */
function renderProjects(category = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const { PROJECTS } = window.PORTFOLIO_DATA;

  const filtered = category === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === category);

  let html = '';

  filtered.forEach(project => {
    html += `
      <article class="project-card reveal active" data-id="${project.id}">
        <div class="project-preview">
          ${getProjectPreviewSvg(project.previewType, project.colorAccent)}
          <span class="project-status-tag ${project.statusClass}">
            ${project.status}
          </span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          
          <ul class="project-features">
            ${project.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div class="project-tags">
            ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div class="project-actions">
            <button class="btn btn-secondary btn-sm open-project-modal" data-id="${project.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Детали и стек
            </button>
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="Исходный код на GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          </div>
        </div>
      </article>
    `;
  });

  // Если проектов пока нет, показываем аккуратные слоты-чертежи
  if (filtered.length === 0 && PROJECTS.length === 0) {
    html += `
      <div class="blueprint-card reveal active" style="grid-column: span 1;">
        <div class="blueprint-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
        <div class="project-status-tag status-concept" style="position:static;">
          Slot 01 // In Development
        </div>
        <h3 class="blueprint-title">Новый проект</h3>
        <p class="blueprint-subtitle">
          Проект находится в разработке. Скоро здесь появится интерактивное превью и описание.
        </p>
      </div>

      <div class="blueprint-card reveal active" style="grid-column: span 1; opacity: 0.85;">
        <div class="blueprint-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div class="project-status-tag status-concept" style="position:static;">
          Slot 02 // В планах
        </div>
        <h3 class="blueprint-title">Следующая работа</h3>
        <p class="blueprint-subtitle">
          В процессе проектирования (веб-сервис или приложение).
        </p>
      </div>
    `;
  } else {
    // Blueprint Slot для следующего проекта
    html += `
      <div class="blueprint-card reveal active" id="blueprintSlotCard">
        <div class="blueprint-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
        <div class="project-status-tag status-concept" style="position:static;">
          Slot 0${PROJECTS.length + 1} // In Development
        </div>
        <h3 class="blueprint-title">Следующий проект</h3>
        <p class="blueprint-subtitle">
          Новая работа находится в активной разработке.
        </p>
      </div>
    `;
  }

  container.innerHTML = html;

  // Bind modal triggers
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      openModal(id);
    });
  });
}

/**
 * High-definition vector mockups for project previews
 */
function getProjectPreviewSvg(type, accent) {
  if (type === 'kanban') {
    return `
      <svg viewBox="0 0 380 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="380" height="190" fill="#F1F5F9" />
        <rect width="380" height="24" fill="#E2E8F0" />
        <circle cx="16" cy="12" r="4" fill="#FF5F56" />
        <circle cx="28" cy="12" r="4" fill="#FFBD2E" />
        <circle cx="40" cy="12" r="4" fill="#27C93F" />
        <rect x="20" y="38" width="105" height="136" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <rect x="30" y="48" width="45" height="6" rx="3" fill="#94A3B8" />
        <rect x="30" y="64" width="85" height="32" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
        <rect x="36" y="74" width="55" height="5" rx="2" fill="${accent}" />
        <rect x="30" y="104" width="85" height="32" rx="4" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="137" y="38" width="105" height="136" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <rect x="147" y="48" width="55" height="6" rx="3" fill="${accent}" />
        <rect x="147" y="64" width="85" height="42" rx="4" fill="#EFF6FF" stroke="#93C5FD" />
        <rect x="153" y="74" width="60" height="5" rx="2" fill="${accent}" />
        <rect x="153" y="85" width="40" height="4" rx="2" fill="#94A3B8" />
        <rect x="254" y="38" width="105" height="136" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <rect x="264" y="48" width="50" height="6" rx="3" fill="#10B981" />
        <rect x="264" y="64" width="85" height="32" rx="4" fill="#ECFDF5" stroke="#A7F3D0" />
        <rect x="270" y="74" width="50" height="5" rx="2" fill="#10B981" />
      </svg>
    `;
  }

  if (type === 'canvas') {
    return `
      <svg viewBox="0 0 380 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="meshGrad1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9" />
          </radialGradient>
        </defs>
        <rect width="380" height="190" fill="url(#meshGrad1)" />
        <path d="M0 40H380 M0 95H380 M0 150H380 M95 0V190 M190 0V190 M285 0V190" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <circle cx="95" cy="95" r="7" fill="#FFFFFF" />
        <circle cx="190" cy="60" r="9" fill="#10B981" />
        <circle cx="285" cy="120" r="8" fill="#60A5FA" />
        <path d="M95 95 L190 60 L285 120" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4" />
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 380 190" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="380" height="190" fill="#0F172A" />
      <path d="M20 140 Q 90 60, 160 110 T 260 50 T 360 80" stroke="${accent}" stroke-width="3" fill="none" />
      <path d="M20 140 Q 90 60, 160 110 T 260 50 T 360 80 V 190 H 20 Z" fill="rgba(245, 158, 11, 0.12)" />
      <circle cx="160" cy="110" r="5" fill="#FFFFFF" stroke="${accent}" stroke-width="2" />
      <circle cx="260" cy="50" r="6" fill="#10B981" />
      <rect x="235" y="24" width="50" height="18" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="242" y="31" width="36" height="4" rx="2" fill="#10B981" />
    </svg>
  `;
}

/**
 * Filter Buttons
 */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });
}

/**
 * Project Details Modal
 */
function openModal(projectId) {
  const { PROJECTS } = window.PORTFOLIO_DATA;
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalDetailsBody');
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <span class="project-status-tag ${project.statusClass}" style="position:static;">
        ${project.status}
      </span>
      <span class="mono" style="font-size:0.8rem;color:var(--text-muted);">ID: 0${project.id} // ${project.category.toUpperCase()}</span>
    </div>
    
    <h2 style="font-size:1.8rem;margin-top:6px;">${project.title}</h2>
    <p style="font-size:1.05rem;line-height:1.6;color:var(--text-secondary);">${project.description}</p>
    
    <div>
      <h4 style="font-size:1rem;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);font-family:var(--font-mono);">Архитектурные решения & фичи:</h4>
      <ul class="project-features" style="font-size:0.95rem;">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div>
      <h4 style="font-size:1rem;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);font-family:var(--font-mono);">Использованный стек:</h4>
      <div class="project-tags">
        ${project.tags.map(t => `<span class="tech-tag" style="font-size:0.85rem;padding:5px 12px;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex;gap:14px;padding-top:16px;border-top:1px solid var(--border-subtle);">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        Смотреть репозиторий на GitHub
      </a>
      <button class="btn btn-secondary close-modal-btn">Закрыть</button>
    </div>
  `;

  modalOverlay.classList.add('open');

  modalOverlay.querySelectorAll('.close-modal-btn, .modal-close-btn').forEach(btn => {
    btn.onclick = () => modalOverlay.classList.remove('open');
  });

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
  };
}



/**
 * Theme Toggle
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio_theme', next);
      updateThemeIcon(next);
      showToast(`Тема изменена: ${next === 'light' ? 'Светлая' : 'Тёмная'}`);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;
  if (theme === 'dark') {
    toggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    toggleBtn.title = "Переключить на светлую тему";
  } else {
    toggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    toggleBtn.title = "Переключить на тёмную тему";
  }
}
window.updateThemeIcon = updateThemeIcon;

/**
 * One-Click Copy Buttons
 */
function initCopyButtons() {
  document.querySelectorAll('.copy-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`✓ Скопировано: ${textToCopy}`);
          }).catch(() => {
            fallbackCopy(textToCopy);
          });
        } else {
          fallbackCopy(textToCopy);
        }
      }
    });
  });
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(`✓ Скопировано: ${text}`);
}

/**
 * Toast Notifications
 */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
window.showToast = showToast;

/**
 * Interactive Playground Canvas
 */
function initPlayground() {
  const canvas = document.getElementById('playgroundCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const hueSlider = document.getElementById('pgHue');
  const speedSlider = document.getElementById('pgSpeed');
  const densitySlider = document.getElementById('pgDensity');
  const copyCssBtn = document.getElementById('btnCopyCss');
  const randomizeBtn = document.getElementById('btnRandomizePg');

  let hue = 220;
  let speed = 1;
  let count = 20;
  let waveStep = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  if (hueSlider) {
    hueSlider.addEventListener('input', (e) => {
      hue = parseInt(e.target.value, 10);
      document.getElementById('valHue').textContent = `${hue}°`;
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speed = parseFloat(e.target.value);
      document.getElementById('valSpeed').textContent = `${speed}x`;
    });
  }

  if (densitySlider) {
    densitySlider.addEventListener('input', (e) => {
      count = parseInt(e.target.value, 10);
      document.getElementById('valDensity').textContent = count;
    });
  }

  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', () => {
      hue = Math.floor(Math.random() * 360);
      speed = +(Math.random() * 2 + 0.5).toFixed(1);
      count = Math.floor(Math.random() * 25 + 10);

      if (hueSlider) hueSlider.value = hue;
      if (speedSlider) speedSlider.value = speed;
      if (densitySlider) densitySlider.value = count;

      document.getElementById('valHue').textContent = `${hue}°`;
      document.getElementById('valSpeed').textContent = `${speed}x`;
      document.getElementById('valDensity').textContent = count;

      showToast(`Новые параметры: Hue ${hue}°, Скорость ${speed}x`);
    });
  }

  if (copyCssBtn) {
    copyCssBtn.addEventListener('click', () => {
      const cssCode = `background: radial-gradient(circle at 50% 50%, hsl(${hue}, 85%, 60%) 0%, hsl(${hue + 40}, 80%, 30%) 100%);`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cssCode).then(() => {
          showToast('CSS код градиента скопирован в буфер!');
        }).catch(() => fallbackCopy(cssCode));
      } else {
        fallbackCopy(cssCode);
      }
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waveStep += 0.02 * speed;

    const w = canvas.width;
    const h = canvas.height;

    // Glow background
    const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 1.5);
    grad.addColorStop(0, `hsla(${hue}, 85%, 55%, 0.25)`);
    grad.addColorStop(1, `hsla(${hue + 40}, 75%, 20%, 0.02)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Ribbons
    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      const progress = i / count;
      const waveHue = (hue + progress * 50) % 360;
      ctx.strokeStyle = `hsla(${waveHue}, 80%, 55%, ${0.2 + progress * 0.5})`;
      ctx.lineWidth = 1.5;

      for (let x = 0; x < w; x += 12) {
        const y = h / 2 + Math.sin(x * 0.015 + waveStep + i * 0.25) * (30 + i * 2) + Math.cos(x * 0.008 - waveStep) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();
}

/**
 * Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const contact = document.getElementById('formContact').value.trim();
    const msg = document.getElementById('formMessage').value.trim();

    if (!name || !contact || !msg) {
      showToast('Пожалуйста, заполните все поля формы');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `Отправка...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`Спасибо, ${name}! Сообщение сохранено. Можно сразу написать в TG: @danilmam`);
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 600);
  });
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}
