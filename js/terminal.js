/**
 * =========================================================================
 * INTERACTIVE TERMINAL CONSOLE // 9i7777
 * =========================================================================
 */

window.initTerminal = function() {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const pillButtons = document.querySelectorAll('.terminal-pill');

  if (!terminalBody || !terminalInput) return;

  const { DEVELOPER_INFO, PROJECTS } = window.PORTFOLIO_DATA;

  const COMMANDS = {
    help: () => `
<span class="term-accent">Доступные команды терминала:</span>
  <span class="term-success">about</span>       - Краткая информация о разработчике 9i7777
  <span class="term-success">skills</span>      - Список ключевых навыков и технологий
  <span class="term-success">projects</span>    - Список текущих концепт-проектов и прототипов
  <span class="term-success">contact</span>     - Прямые контакты (Telegram, Email, GitHub)
  <span class="term-success">theme</span>       - Переключить тему (Светлая / Тёмная)
  <span class="term-success">clear</span>       - Очистить экран терминала
  <span class="term-success">sudo</span>        - Получить root доступ
  <span class="term-success">time</span>        - Показать текущее локальное время
`,

    about: () => `
<span class="term-accent">══ Разработчик:</span> <span class="term-success">${DEVELOPER_INFO.nickname}</span>
<span class="term-accent">══ Роль:</span> ${DEVELOPER_INFO.specialization}
<span class="term-accent">══ Статус:</span> ${DEVELOPER_INFO.status}
<span class="term-muted">Фокусируюсь на создании быстрых, чистых и эстетичных интерфейсов. Пишу структурированный код без лишних оверхедов.</span>
`,

    skills: () => `
<span class="term-accent">══ ТЕХНОЛОГИЧЕСКИЙ СТЕК // 9i7777:</span>
  • <span class="term-success">Core:</span> HTML5 (Semantic, ARIA), CSS3 (Grid, Flex, Modern CSS), JavaScript ES6+
  • <span class="term-success">Libraries:</span> React (базовый), Web APIs, Canvas API, REST / JSON
  • <span class="term-success">Workflow:</span> Git / GitHub, Figma to Code, Chrome DevTools, VS Code
  • <span class="term-success">Принципы:</span> Чистая архитектура, адаптивность, высокая скорость загрузки
`,

    projects: () => {
      if (!PROJECTS || PROJECTS.length === 0) {
        return `
<span class="term-accent">══ РЕЕСТР ПРОЕКТОВ // 9i7777:</span>
  <span class="term-warning">● Проекты сейчас находятся в процессе активной разработки.</span>
  <span class="term-muted">Следите за обновлениями на GitHub: github.com/${DEVELOPER_INFO.github}</span>
  <span class="term-muted">Введите 'contact', чтобы связаться напрямую в Telegram!</span>
`;
      }
      let out = `<span class="term-accent">══ ТЕКУЩИЕ ПРОЕКТЫ И ПРОТОТИПЫ [${PROJECTS.length}]:</span>\n`;
      PROJECTS.forEach((p, idx) => {
        out += `  [0${idx + 1}] <span class="term-success">${p.title}</span> — <span class="term-muted">${p.status}</span>\n      Стек: ${p.tags.join(', ')}\n`;
      });
      out += `\n<span class="term-muted">Введи 'contact', чтобы обсудить совместный проект или стажировку!</span>`;
      return out;
    },

    contact: () => `
<span class="term-accent">══ СВЯЗАТЬСЯ С 9i7777:</span>
  • <span class="term-success">Telegram:</span> ${DEVELOPER_INFO.telegram} (<a href="${DEVELOPER_INFO.telegramUrl}" target="_blank" style="color:#60A5FA;text-decoration:underline;">написать в TG</a>)
  • <span class="term-success">GitHub:</span> github.com/${DEVELOPER_INFO.github}
  • <span class="term-success">Email:</span> ${DEVELOPER_INFO.email}
  <span class="term-muted">(Кликни по плашкам внизу страницы, чтобы скопировать в один клик)</span>
`,

    theme: () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      if (window.updateThemeIcon) window.updateThemeIcon(newTheme);
      return `<span class="term-success">✓ Тема переключена на:</span> ${newTheme === 'dark' ? 'Тёмная' : 'Светлая'}`;
    },

    sudo: () => `<span class="term-warning">Permission denied: Вы уже обладаете полным доступом к портфолио 9i7777 😉</span>`,

    time: () => `<span class="term-accent">Текущее время системы:</span> ${new Date().toLocaleString('ru-RU')}`,

    clear: () => {
      terminalBody.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo command line
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'term-line';
    cmdEcho.innerHTML = `<span class="terminal-prompt">9i7777@portfolio:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
    terminalBody.appendChild(cmdEcho);

    // Run command
    if (cmd === 'clear') {
      COMMANDS.clear();
      return;
    }

    const handler = COMMANDS[cmd];
    const resDiv = document.createElement('div');
    resDiv.className = 'term-line terminal-output';

    if (handler) {
      const res = handler();
      if (res) resDiv.innerHTML = res;
    } else {
      resDiv.innerHTML = `<span class="term-warning">Команда не найдена: '${escapeHtml(cmd)}'. Введите <span class="term-success">help</span> для списка доступных команд.</span>`;
    }

    terminalBody.appendChild(resDiv);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Enter in input
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  // Clickable pills
  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
