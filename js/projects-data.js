/**
 * =========================================================================
 * РЕЕСТР ПРОЕКТОВ И ЛАБОРАТОРИЯ // 9i7777
 * =========================================================================
 * 
 * ИНСТРУКЦИЯ ДЛЯ ТЕБЯ (9i7777):
 * Чтобы добавить новую работу в портфолио, просто добавь новый объект
 * в массив PROJECTS ниже. Поля:
 * - id: уникальный номер
 * - title: Название проекта
 * - category: 'frontend' | 'prototype' | 'tool'
 * - status: 'Ready' | 'Prototype' | 'In Progress'
 * - statusClass: 'status-ready' | 'status-prototype' | 'status-concept'
 * - description: Краткое описание задачи и результата
 * - features: Список ключевых фич и архитектурных решений (массив строк)
 * - tags: Стек технологий (массив строк, например: ['HTML5', 'CSS Grid', 'JS'])
 * - demoUrl: Ссылка на рабочий сайт или демо
 * - githubUrl: Ссылка на репозиторий на GitHub
 * - colorAccent: Акцентный цвет для карточки (HEX)
 * - previewType: 'kanban' | 'canvas' | 'crypto'
 */

// Сейчас массив пуст — ты будешь добавлять свои проекты сюда сам!
// Ниже пример, как должен выглядеть объект проекта:
/*
const EXAMPLE_PROJECT = {
  id: 1,
  title: "Название твоего проекта",
  category: "frontend", // 'frontend' | 'prototype' | 'tool'
  status: "Ready",       // 'Ready' | 'Prototype' | 'In Progress'
  statusClass: "status-ready", // 'status-ready' | 'status-prototype' | 'status-concept'
  description: "Краткое описание задачи и результата...",
  features: [
    "Первая ключевая фича",
    "Вторая ключевая особенность",
    "Технологическое решение"
  ],
  tags: ["HTML5", "CSS Grid", "JavaScript"],
  demoUrl: "https://твое-демо.vercel.app",
  githubUrl: "https://github.com/9i7777/твой-репозиторий",
  colorAccent: "#2563EB",
  previewType: "kanban" // 'kanban' | 'canvas' | 'crypto'
};
*/

const PROJECTS = [
  // Сюда вставляй свои объекты проектов через запятую:
];

const DEVELOPER_INFO = {
  nickname: "9i7777",
  specialization: "Junior Frontend & Web Developer",
  status: "Открыт к стажировке, Junior-позициям и freelance проектам",
  telegram: "@danilmam",
  telegramUrl: "https://t.me/danilmam",
  github: "9i7777",
  githubUrl: "https://github.com/9i7777",
  email: "danila1999998@gmail.com",
  location: "Remote / Relocation ready"
};

// Экспорт для браузера (работает и локально через double-click file://, и на сервере)
window.PORTFOLIO_DATA = {
  PROJECTS,
  DEVELOPER_INFO
};
