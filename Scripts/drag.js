// Estado global de arrastre
let isDragging = false; // Indicador de si se está arrastrando
let draggedElement = null; // Referencia al elemento siendo arrastrado
let startX = 0; // Posición X inicial del mouse
let startY = 0; // Posición Y inicial del mouse

// Obtener referencias a elementos principales del CV
const rightPanel = document.querySelector('.right');
const leftPanel = document.querySelector('.left');
const logoBox = document.querySelector('.logo-box');
const panel = document.querySelector('.panel');
const buttons = document.querySelectorAll('.btn');

// Array de todos los elementos arrastrables
const draggables = [rightPanel, leftPanel, logoBox, panel, ...buttons];

// Configurar listeners de mousedown para iniciar arrastre
draggables.forEach((el) => {
  if (!el) return;
  el.style.cursor = 'grab'; // Cursor visual de "agarrable"

  el.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Solo botón izquierdo
    isDragging = true;
    draggedElement = el;
    startX = e.clientX; // Guardar posición inicial
    startY = e.clientY;
    el.style.cursor = 'grabbing'; // Cambiar cursor a "agarrando"
    el.style.zIndex = '999'; // Traer al frente
  });
});

// Calcular desplazamiento durante arrastre: rotación + oscilación sinusoidal
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !draggedElement) return;
  
  // Calcular delta (diferencia) desde posición inicial
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  
  // Rotación proporcional al desplazamiento horizontal
  const rotation = (dx / 50) * 3;
  
  // Wobble: oscilación basada en tiempo para efecto fluido
  const wobble = Math.sin(Date.now() / 100) * 1.5;

  // Aplicar transformaciones CSS via variables personalizadas
  draggedElement.style.setProperty('--drag-tx', `${dx}px`);
  draggedElement.style.setProperty('--drag-ty', `${dy}px`);
  draggedElement.style.setProperty('--drag-rot', `${rotation + wobble}deg`);
});

// Restaurar elemento al soltar mouse
document.addEventListener('mouseup', () => {
  if (draggedElement) {
    draggedElement.style.cursor = 'grab'; // Volver a cursor grab
    draggedElement.style.zIndex = ''; // Restaurar z-index
    
    // Resetear transformaciones (interpoladas por CSS transition)
    draggedElement.style.setProperty('--drag-tx', '0px');
    draggedElement.style.setProperty('--drag-ty', '0px');
    draggedElement.style.setProperty('--drag-rot', '0deg');
  }
  isDragging = false;
  draggedElement = null;
});
