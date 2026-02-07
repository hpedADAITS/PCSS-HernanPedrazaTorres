// Drag and drop functionality
let isDragging = false;
let draggedElement = null;
let startX = 0;
let startY = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;

const rightPanel = document.querySelector('.right');
const leftPanel = document.querySelector('.left');
const logoBox = document.querySelector('.logo-box');
const panel = document.querySelector('.panel');
const buttons = document.querySelectorAll('.btn');

const draggables = [rightPanel, leftPanel, logoBox, panel, ...buttons];

draggables.forEach((el) => {
  if (!el) return;
  el.style.cursor = 'grab';

  el.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    draggedElement = el;
    startX = e.clientX;
    startY = e.clientY;
    dragOffsetX = 0;
    dragOffsetY = 0;
    el.style.cursor = 'grabbing';
    el.style.position = 'absolute';
    el.style.zIndex = '999';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !draggedElement) return;
  dragOffsetX = e.clientX - startX;
  dragOffsetY = e.clientY - startY;
  const rotation = (dragOffsetX / 50) * 3;
  const wobble = Math.sin(Date.now() / 100) * 1.5;

  draggedElement.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px) rotate(${rotation + wobble}deg)`;
});

document.addEventListener('mouseup', () => {
  if (draggedElement) {
    draggedElement.style.cursor = 'grab';
    draggedElement.style.zIndex = '';
  }
  isDragging = false;
  draggedElement = null;
});
