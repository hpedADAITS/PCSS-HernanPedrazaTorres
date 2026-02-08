// IIFE: Gestionar escala responsiva del diseño (1414x2000px → viewport actual)
(function () {
  // Dimensiones de diseño fijo (desktop)
  const DESIGN_W = 1414;
  const DESIGN_H = 2000;
  
  // Media query para detectar cambios de breakpoint mobile
  const mq = matchMedia('(max-width: 767.98px)');

  const viewport = document.querySelector('.viewport');
  const stage = document.querySelector('.stage');
  
  // Salir si no existen elementos
  if (!viewport || !stage) return;

  // Función principal: recalcular escala según ancho de viewport
  function layout() {
    // En móvil: sin escalado (1:1), altura automática
    if (mq.matches) {
      stage.style.setProperty('--s', '1');
      viewport.style.height = 'auto';
      return;
    }
    
    // Desktop: calcular escala manteniendo proporción (max 100%)
    const w = viewport.clientWidth;
    const s = Math.min(1, w / DESIGN_W); // Scale factor
    stage.style.setProperty('--s', String(s));
    
    // Altura del viewport = altura de diseño * escala
    viewport.style.height = DESIGN_H * s + 'px';
  }

  // Listeners para recalcular en cambios de breakpoint y resize
  mq.addEventListener('change', layout);
  addEventListener('resize', layout, { passive: true }); // passive: no prevenir scroll
  
  // Calcular layout inicial
  layout();
})();
