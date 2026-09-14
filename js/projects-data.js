/**
 * =========================================================================
 * РЕЕСТР ПРОЕКТОВ И ДАННЫЕ // 9i7777
 * =========================================================================
 */
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
