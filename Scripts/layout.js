// IIFE: Gestionar escala responsiva del diseño (1414x2000px → viewport actual)
(function () {
  // Dimensiones de diseño fijo (desktop)
  const DESIGN_W = 1414;
  const DESIGN_H = 2000;
  
  // Media query para detectar cambios de breakpoint mobile
  const mq = matchMedia('(max-width: 767.98px)');

  const viewport = document.querySelector('.viewport');
  const stage = document.querySelector('.stage');
  
  if (!viewport || !stage) return;

  // Función principal: recalcular escala según ancho de viewport
  function layout() {
    // En móvil: sin escalado (1:1), altura automática
    if (mq.matches) {
      stage.style.setProperty('--s', '1');
      viewport.style.height = 'auto';
      stage.style.height = 'auto';
      return;
    }
    const w = viewport.clientWidth;
    const s = Math.min(1, w / DESIGN_W);
    stage.style.setProperty('--s', String(s));
    const contentH = stage.scrollHeight;
    viewport.style.height = contentH * s + 'px';
  }

  const ro = new ResizeObserver(layout);
  ro.observe(stage);

  mq.addEventListener('change', layout);
  addEventListener('resize', layout, { passive: true });
  layout();
})();
